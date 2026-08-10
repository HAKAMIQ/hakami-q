import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const strict = args.has('--strict');
const jsonIndex = process.argv.indexOf('--json');
const jsonPath = jsonIndex >= 0 ? process.argv[jsonIndex + 1] : '';
const rank = { info: 0, low: 1, medium: 2, high: 3, critical: 4 };
const findings = [];
const scannedFiles = new Set();

const relative = (file) => path.relative(root, file).replaceAll(path.sep, '/');
const lineAt = (text, index) => text.slice(0, Math.max(0, index)).split('\n').length;

function finding(severity, rule, file, line, message, evidence = '') {
  findings.push({
    severity,
    rule,
    file: relative(file),
    line,
    message,
    evidence: String(evidence).replace(/\s+/g, ' ').slice(0, 240),
  });
}

async function walk(directory, accept = () => true) {
  const files = [];
  let entries;
  try { entries = await readdir(directory, { withFileTypes: true }); }
  catch { return files; }
  for (const entry of entries) {
    if (['node_modules', 'dist', '.git', '.astro'].includes(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full, accept));
    else if (accept(full)) files.push(full);
  }
  return files;
}

function decodeEntities(value = '') {
  return value
    .replace(/&amp;/gi, '&')
    .replace(/&colon;/gi, ':')
    .replace(/&tab;/gi, '\t')
    .replace(/&newline;/gi, '\n')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)));
}

function stripFrontmatter(source) {
  const match = source.match(/^\uFEFF?---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/);
  return match ? source.slice(match[0].length) : source;
}

function protectLiterals(source) {
  const pattern = /```[\s\S]*?```|~~~[\s\S]*?~~~|<pre\b[\s\S]*?<\/pre>|<code\b[\s\S]*?<\/code>|<!--[\s\S]*?-->|`[^`\n]*`/gi;
  let index = 0;
  return source.replace(pattern, () => `\u0000HQ_SECURITY_LITERAL_${index++}\u0000`);
}

function scanRegex(file, text, regex, severity, rule, message) {
  for (const match of text.matchAll(regex)) {
    finding(severity, rule, file, lineAt(text, match.index ?? 0), message, match[0]);
  }
}

function dangerousScheme(value) {
  return /^(?:\s|[\u0000-\u001f])*?(?:javascript|vbscript)\s*:/i.test(value)
    || /^(?:\s|[\u0000-\u001f])*?data\s*:\s*(?:text\/html|image\/svg\+xml)\s*[;,]/i.test(value);
}

function scanArticle(file, source) {
  const body = decodeEntities(protectLiterals(stripFrontmatter(source)));

  for (const match of body.matchAll(/<[a-z][^>]*>/gi)) {
    const tag = match[0];
    const line = lineAt(body, match.index ?? 0);
    const name = tag.match(/^<\s*([a-z0-9:-]+)/i)?.[1]?.toLowerCase() || '';

    if (name === 'script') finding('critical', 'content.raw-script', file, line, 'Executable <script> tag in raw-rendered article content.', tag);
    if (/\son[a-z][a-z0-9_-]*\s*=/i.test(tag)) finding('critical', 'content.event-handler', file, line, 'Inline DOM event handler in article markup.', tag);
    if (/\ssrcdoc\s*=/i.test(tag)) finding('critical', 'content.iframe-srcdoc', file, line, 'iframe srcdoc can execute attacker-controlled HTML.', tag);
    if (['object', 'embed', 'base'].includes(name)) finding('high', 'content.active-tag', file, line, 'Active document/embed tag in article content.', tag);
    if (name === 'meta' && /\bhttp-equiv\s*=\s*["']?refresh\b/i.test(tag)) finding('high', 'content.meta-refresh', file, line, 'Meta refresh can force navigation.', tag);
    if (name === 'form') finding('medium', 'content.form', file, line, 'HTML form exists inside public article content; verify it cannot spoof site UI or submit cross-origin.', tag);
    if (name === 'input' && /\btype\s*=\s*(["'])?(?:password|file)\1?/i.test(tag)) finding('medium', 'content.sensitive-input', file, line, 'Sensitive input control exists inside public article content.', tag);

    for (const attr of tag.matchAll(/\b(?:href|src|xlink:href|action|formaction)\s*=\s*(["'])([^"']*)\1/gi)) {
      if (dangerousScheme(attr[2])) finding('critical', 'content.dangerous-url', file, line, 'Executable or active-data URL scheme in article markup.', attr[0]);
    }
  }

  scanRegex(file, body, /\]\(\s*<?(?:javascript|vbscript)\s*:/gi, 'critical', 'content.markdown-dangerous-url', 'Dangerous URL scheme in Markdown link/image syntax.');
  scanRegex(file, body, /\]\(\s*<?data\s*:\s*(?:text\/html|image\/svg\+xml)\s*[,;]/gi, 'critical', 'content.markdown-active-data', 'Active data URL in Markdown link/image syntax.');
  scanRegex(file, body, /<style\b[^>]*>[\s\S]*?(?:expression\s*\(|javascript\s*:|-moz-binding\s*:)[\s\S]*?<\/style>/gi, 'high', 'content.active-css', 'Legacy CSS contains an active scripting construct.');

  for (const match of body.matchAll(/<iframe\b([^>]*)>/gi)) {
    const attrs = match[1] || '';
    const src = attrs.match(/\bsrc\s*=\s*(["'])([^"']+)\1/i)?.[2] || '';
    let trusted = false;
    try {
      const url = new URL(src);
      trusted = url.protocol === 'https:'
        && ['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com', 'youtube-nocookie.com'].includes(url.hostname)
        && /^\/embed\/[A-Za-z0-9_-]{6,20}\/?$/.test(url.pathname);
    } catch {}
    if (!trusted) finding('medium', 'content.external-iframe', file, lineAt(body, match.index ?? 0), 'Article iframe is not a strict YouTube/YouTube-nocookie embed.', match[0]);
  }
}

function scanExecutable(file, source) {
  const name = relative(file);
  if (!/\.(?:js|mjs|cjs|ts|tsx|astro)$/i.test(file) || name === 'scripts/security-audit.mjs') return;
  const severity = name.includes('self-test') || name.includes('/test') ? 'low' : 'high';
  scanRegex(file, source, /\beval\s*\(/g, severity, 'code.dynamic-eval', 'Dynamic eval() execution primitive found.');
  scanRegex(file, source, /\bnew\s+Function\s*\(/g, severity, 'code.dynamic-function', 'Dynamic Function constructor found.');
  scanRegex(file, source, /(?:node:)?child_process|\bexecFileSync\s*\(|\bexecSync\s*\(|\bspawnSync\s*\(/g, severity, 'code.process-exec', 'OS process execution primitive found; review source-to-sink controls.');
  scanRegex(file, source, /\b(?:coinhive|coinimp|cryptoloot|webminepool|cryptonight|stratum\+tcp|miner\.start\s*\(|webminerpool)\b/gi, 'high', 'code.mining-indicator', 'Cryptomining/malicious mining indicator found in executable source.');
}

function scanSecrets(file, source) {
  const rules = [
    ['critical', 'secret.private-key', /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g, 'Private key material committed to the repository.'],
    ['critical', 'secret.github-token', /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{40,})\b/g, 'GitHub access token pattern committed to the repository.'],
    ['critical', 'secret.aws-key', /\bAKIA[0-9A-Z]{16}\b/g, 'AWS access key identifier committed to the repository.'],
    ['high', 'secret.bearer', /\bAuthorization\s*[:=]\s*["']Bearer\s+[A-Za-z0-9._~+\/-]{24,}["']/gi, 'Literal bearer credential committed to source.'],
  ];
  for (const [severity, rule, regex, message] of rules) scanRegex(file, source, regex, severity, rule, message);
}

function scanWorkflow(file, source) {
  if (!/\.ya?ml$/i.test(file)) return;
  if (/\bpull_request_target\s*:/m.test(source)) finding('high', 'workflow.pull-request-target', file, lineAt(source, source.indexOf('pull_request_target')), 'pull_request_target requires strict checkout/input controls.');

  for (const match of source.matchAll(/^\s*uses:\s*([^\s#]+)\s*$/gm)) {
    const ref = match[1];
    if (!ref.includes('@')) continue;
    const version = ref.slice(ref.lastIndexOf('@') + 1);
    if (!/^[0-9a-f]{40}$/i.test(version)) finding('medium', 'workflow.unpinned-action', file, lineAt(source, match.index ?? 0), 'Action uses a mutable tag instead of an immutable commit SHA.', ref);
  }

  const write = /\bcontents\s*:\s*write\b/.test(source);
  const pr = /\bpull_request(?:_target)?\s*:/.test(source);
  if (write && pr) finding('critical', 'workflow.pr-write-token', file, 1, 'Workflow combines pull-request execution with contents: write.');
  else if (write) finding('medium', 'workflow.write-token', file, 1, 'Workflow has repository write permission; minimize trigger and write scope.');

  for (const match of source.matchAll(/^\s*run:\s*[|>-]?([\s\S]*?)(?=^\s*-\s+name:|^\s*-\s+uses:|^\s{0,6}[A-Za-z0-9_-]+:|\Z)/gm)) {
    if (/\$\{\{\s*github\.event\.(?:issue|pull_request|comment|head_commit|commits|workflow_run)[^}]*\}\}/.test(match[0])) {
      finding('high', 'workflow.event-shell-injection', file, lineAt(source, match.index ?? 0), 'Untrusted GitHub event data is interpolated directly into a shell run block.');
    }
  }
}

const articleFiles = await walk(path.join(root, 'src', 'content', 'blog'), (file) => /\.(?:md|mdx)$/i.test(file));
for (const file of articleFiles) {
  const source = await readFile(file, 'utf8');
  scannedFiles.add(relative(file));
  scanArticle(file, source);
  scanSecrets(file, source);
}

const codeFiles = [];
for (const directory of ['functions', 'src', 'scripts', '.github', 'migrations']) {
  codeFiles.push(...await walk(path.join(root, directory), (file) => /\.(?:js|mjs|cjs|ts|tsx|astro|json|jsonc|ya?ml|sql|css|html)$/i.test(file)));
}
for (const rootFile of ['package.json', 'package-lock.json', 'wrangler.jsonc', '.gitignore']) {
  const file = path.join(root, rootFile);
  try { if ((await stat(file)).isFile()) codeFiles.push(file); } catch {}
}

for (const file of [...new Set(codeFiles)]) {
  const source = await readFile(file, 'utf8');
  scannedFiles.add(relative(file));
  scanExecutable(file, source);
  scanSecrets(file, source);
  if (relative(file).startsWith('.github/workflows/')) scanWorkflow(file, source);
}

findings.sort((a, b) => rank[b.severity] - rank[a.severity] || a.file.localeCompare(b.file) || a.line - b.line);
const counts = Object.fromEntries(Object.keys(rank).map((severity) => [severity, findings.filter((x) => x.severity === severity).length]));
const report = { generatedAt: new Date().toISOString(), scannedFiles: scannedFiles.size, articleFiles: articleFiles.length, counts, findings };

console.log(`Security audit: ${report.scannedFiles} files | ${report.articleFiles} articles | critical=${counts.critical} high=${counts.high} medium=${counts.medium} low=${counts.low}`);
for (const item of findings.slice(0, 120)) console.log(`${item.severity.toUpperCase()} [${item.rule}] ${item.file}:${item.line} ${item.message}${item.evidence ? ` :: ${item.evidence}` : ''}`);
if (findings.length > 120) console.log(`… ${findings.length - 120} additional finding(s) are in the JSON report.`);

if (jsonPath) {
  const output = path.resolve(root, jsonPath);
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(`Report: ${relative(output)}`);
}

if (strict && findings.some((item) => rank[item.severity] >= rank.high)) process.exitCode = 1;
