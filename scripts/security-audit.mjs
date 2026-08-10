import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const strict = args.has('--strict');
const jsonIndex = process.argv.indexOf('--json');
const jsonPath = jsonIndex >= 0 ? process.argv[jsonIndex + 1] : '';

const severityRank = { info: 0, low: 1, medium: 2, high: 3, critical: 4 };
const findings = [];
const scannedFiles = new Set();

function rel(file) {
  return path.relative(root, file).replaceAll(path.sep, '/');
}

function lineNumber(text, index) {
  return text.slice(0, Math.max(0, index)).split('\n').length;
}

function addFinding({ severity, rule, file, line = 1, message, evidence = '' }) {
  findings.push({ severity, rule, file: rel(file), line, message, evidence: String(evidence).slice(0, 240) });
}

async function walk(directory, accept = () => true) {
  const files = [];
  let entries;
  try { entries = await readdir(directory, { withFileTypes: true }); }
  catch { return files; }
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git' || entry.name === '.astro') continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full, accept));
    else if (accept(full)) files.push(full);
  }
  return files;
}

function decodeEntities(value = '') {
  return value
    .replace(/&nbsp;/gi, ' ')
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

function protectLiteralBlocks(source) {
  const blocks = [];
  const pattern = /```[\s\S]*?```|~~~[\s\S]*?~~~|<pre\b[\s\S]*?<\/pre>|<code\b[\s\S]*?<\/code>|<!--([\s\S]*?)-->|`[^`\n]*`/gi;
  const text = source.replace(pattern, (block) => {
    const token = `\u0000HQ_SECURITY_LITERAL_${blocks.length}\u0000`;
    blocks.push(block);
    return token;
  });
  return { text, blocks };
}

function scanPattern(file, text, regex, severity, rule, message) {
  regex.lastIndex = 0;
  for (const match of text.matchAll(regex)) {
    addFinding({
      severity,
      rule,
      file,
      line: lineNumber(text, match.index ?? 0),
      message,
      evidence: match[0].replace(/\s+/g, ' '),
    });
  }
}

function scanArticle(file, source) {
  const body = stripFrontmatter(source);
  const protectedBody = protectLiteralBlocks(body).text;
  const decoded = decodeEntities(protectedBody);

  scanPattern(file, decoded, /<script\b[^>]*>/gi, 'critical', 'content.raw-script', 'Executable <script> tag in article content rendered through raw HTML.');
  scanPattern(file, decoded, /\son[a-z][a-z0-9_-]*\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, 'critical', 'content.event-handler', 'Inline DOM event handler in article content.');
  scanPattern(file, decoded, /\bsrcdoc\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, 'critical', 'content.iframe-srcdoc', 'iframe srcdoc can execute attacker-controlled HTML.');
  scanPattern(file, decoded, /<(?:object|embed|base)\b[^>]*>/gi, 'high', 'content.active-tag', 'Active document/embed tag in article content.');
  scanPattern(file, decoded, /<meta\b[^>]*http-equiv\s*=\s*["']?refresh\b[^>]*>/gi, 'high', 'content.meta-refresh', 'Meta refresh can force navigation from article content.');
  scanPattern(file, decoded, /\b(?:href|src|xlink:href|action|formaction)\s*=\s*(["'])\s*(?:javascript|vbscript|data\s*:\s*(?:text\/html|image\/svg\+xml))\s*:/gi, 'critical', 'content.dangerous-url', 'Executable or active-data URL scheme in article markup.');
  scanPattern(file, decoded, /\]\(\s*<?(?:javascript|vbscript|data\s*:\s*(?:text\/html|image\/svg\+xml))\s*:/gi, 'critical', 'content.markdown-dangerous-url', 'Dangerous URL scheme in Markdown link/image syntax can bypass HTML-only sanitizers.');
  scanPattern(file, decoded, /<style\b[^>]*>[\s\S]*?(?:expression\s*\(|javascript\s*:|-moz-binding\s*:)[\s\S]*?<\/style>/gi, 'high', 'content.active-css', 'Legacy CSS contains an active scripting construct.');
  scanPattern(file, decoded, /<form\b[^>]*>|<(?:input|button|select|textarea)\b[^>]*>/gi, 'medium', 'content.form-control', 'Interactive form/control exists inside public article content.');

  for (const match of decoded.matchAll(/<iframe\b([^>]*)>/gi)) {
    const attrs = match[1] || '';
    const srcMatch = attrs.match(/\bsrc\s*=\s*(["'])([^"']+)\1/i);
    const value = srcMatch?.[2] || '';
    let trusted = false;
    try {
      const url = new URL(value);
      trusted = url.protocol === 'https:'
        && ['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com', 'youtube-nocookie.com'].includes(url.hostname)
        && /^\/embed\/[A-Za-z0-9_-]{6,20}\/?$/.test(url.pathname);
    } catch {}
    if (!trusted) {
      addFinding({
        severity: 'medium',
        rule: 'content.external-iframe',
        file,
        line: lineNumber(decoded, match.index ?? 0),
        message: 'Article iframe is not a strict YouTube/YouTube-nocookie embed.',
        evidence: match[0].replace(/\s+/g, ' '),
      });
    }
  }
}

function scanExecutableSource(file, source) {
  const normalized = rel(file);
  if (!/\.(?:js|mjs|cjs|ts|tsx|astro)$/i.test(file)) return;

  // Test fixtures may intentionally mention dangerous primitives as strings; still report them as low if present.
  const severity = normalized.includes('self-test') || normalized.includes('/test') ? 'low' : 'high';
  scanPattern(file, source, /\beval\s*\(/g, severity, 'code.dynamic-eval', 'Dynamic eval() execution primitive found.');
  scanPattern(file, source, /\bnew\s+Function\s*\(/g, severity, 'code.dynamic-function', 'Dynamic Function constructor found.');
  scanPattern(file, source, /(?:node:)?child_process|\bexecFileSync\s*\(|\bexecSync\s*\(|\bspawnSync\s*\(/g, severity, 'code.process-exec', 'OS process execution primitive found; review source-to-sink controls.');
}

function scanSecrets(file, source) {
  const patterns = [
    ['critical', 'secret.private-key', /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g, 'Private key material committed to the repository.'],
    ['critical', 'secret.github-token', /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{40,})\b/g, 'GitHub access token pattern committed to the repository.'],
    ['critical', 'secret.aws-key', /\bAKIA[0-9A-Z]{16}\b/g, 'AWS access key identifier committed to the repository.'],
    ['high', 'secret.bearer', /\bAuthorization\s*[:=]\s*["']Bearer\s+[A-Za-z0-9._~+\/-]{24,}["']/gi, 'Literal bearer credential committed to source.'],
  ];
  for (const [severity, rule, regex, message] of patterns) scanPattern(file, source, regex, severity, rule, message);
}

function scanWorkflow(file, source) {
  if (!/\.ya?ml$/i.test(file)) return;
  if (/\bpull_request_target\s*:/m.test(source)) {
    addFinding({ severity: 'high', rule: 'workflow.pull-request-target', file, line: lineNumber(source, source.indexOf('pull_request_target')), message: 'pull_request_target executes with base-repository privileges and requires strict checkout/input controls.' });
  }

  for (const match of source.matchAll(/^\s*uses:\s*([^\s#]+)\s*$/gm)) {
    const ref = match[1];
    if (!ref.includes('@')) continue;
    const version = ref.slice(ref.lastIndexOf('@') + 1);
    if (!/^[0-9a-f]{40}$/i.test(version)) {
      addFinding({
        severity: 'medium',
        rule: 'workflow.unpinned-action',
        file,
        line: lineNumber(source, match.index ?? 0),
        message: 'Third-party/GitHub Action is referenced by a mutable tag instead of an immutable commit SHA.',
        evidence: ref,
      });
    }
  }

  const hasWrite = /\bcontents\s*:\s*write\b/.test(source);
  const handlesPr = /\bpull_request(?:_target)?\s*:/.test(source);
  if (hasWrite && handlesPr) {
    addFinding({ severity: 'critical', rule: 'workflow.pr-write-token', file, line: 1, message: 'Workflow combines pull-request execution with contents: write.' });
  } else if (hasWrite) {
    addFinding({ severity: 'medium', rule: 'workflow.write-token', file, line: 1, message: 'Workflow has repository write permission; minimize trigger and write scope.' });
  }

  for (const match of source.matchAll(/^\s*run:\s*[|>-]?([\s\S]*?)(?=^\s*-\s+name:|^\s*-\s+uses:|^\s{0,6}[A-Za-z0-9_-]+:|\Z)/gm)) {
    if (/\$\{\{\s*github\.event\.(?:issue|pull_request|comment|head_commit|commits|workflow_run)[^}]*\}\}/.test(match[0])) {
      addFinding({ severity: 'high', rule: 'workflow.event-shell-injection', file, line: lineNumber(source, match.index ?? 0), message: 'Untrusted GitHub event data is interpolated directly into a shell run block.' });
    }
  }
}

const articleFiles = await walk(path.join(root, 'src', 'content', 'blog'), (file) => /\.(?:md|mdx)$/i.test(file));
for (const file of articleFiles) {
  const source = await readFile(file, 'utf8');
  scannedFiles.add(rel(file));
  scanArticle(file, source);
  scanSecrets(file, source);
}

const codeRoots = ['functions', 'src', 'scripts', '.github', 'migrations'];
const codeFiles = [];
for (const directory of codeRoots) {
  codeFiles.push(...await walk(path.join(root, directory), (file) => /\.(?:js|mjs|cjs|ts|tsx|astro|json|jsonc|ya?ml|sql|css|html)$/i.test(file)));
}
for (const rootFile of ['package.json', 'package-lock.json', 'wrangler.jsonc', '.gitignore']) {
  const file = path.join(root, rootFile);
  try { if ((await stat(file)).isFile()) codeFiles.push(file); } catch {}
}

for (const file of [...new Set(codeFiles)]) {
  const source = await readFile(file, 'utf8');
  scannedFiles.add(rel(file));
  scanExecutableSource(file, source);
  scanSecrets(file, source);
  if (rel(file).startsWith('.github/workflows/')) scanWorkflow(file, source);
}

findings.sort((a, b) => severityRank[b.severity] - severityRank[a.severity] || a.file.localeCompare(b.file) || a.line - b.line);
const counts = Object.fromEntries(Object.keys(severityRank).map((severity) => [severity, findings.filter((finding) => finding.severity === severity).length]));
const report = {
  generatedAt: new Date().toISOString(),
  scannedFiles: scannedFiles.size,
  articleFiles: articleFiles.length,
  counts,
  findings,
};

console.log(`Security audit: ${report.scannedFiles} files | ${report.articleFiles} articles | critical=${counts.critical} high=${counts.high} medium=${counts.medium} low=${counts.low}`);
for (const finding of findings.slice(0, 80)) {
  console.log(`${finding.severity.toUpperCase()} [${finding.rule}] ${finding.file}:${finding.line} ${finding.message}${finding.evidence ? ` :: ${finding.evidence}` : ''}`);
}
if (findings.length > 80) console.log(`… ${findings.length - 80} additional finding(s) are in the JSON report.`);

if (jsonPath) {
  const output = path.resolve(root, jsonPath);
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.log(`Report: ${rel(output)}`);
}

if (strict && findings.some((finding) => severityRank[finding.severity] >= severityRank.high)) process.exitCode = 1;
