import { AuthError, getAuthenticatedUser, requireSameOriginPost } from '../../_lib/auth.js';
import { isMfaEnabled } from '../../_lib/mfa.js';
import { isCurrentSessionMfaVerified } from '../../_lib/mfa-session.js';

const encoder = new TextEncoder();
const MAX_INPUT_BYTES = 180 * 1024;
const MAX_TITLE_LENGTH = 180;
const MAX_DESCRIPTION_LENGTH = 360;
const DEFAULT_MODEL = 'gpt-5.6-terra';
const PRESERVE_TOKEN = /\[\[HAKAMIQ_PRESERVE_\d{4}\]\]/g;

const JSON_HEADERS = {
	'Content-Type': 'application/json; charset=utf-8',
	'Cache-Control': 'no-store, private',
	'X-Content-Type-Options': 'nosniff',
	'X-Frame-Options': 'DENY',
	'Referrer-Policy': 'no-referrer',
};

class RewriteError extends Error {
	constructor(message, status = 400) {
		super(message);
		this.status = status;
	}
}

function json(payload, status = 200) {
	return new Response(JSON.stringify(payload), { status, headers: JSON_HEADERS });
}

async function requireAdminMfa(request, env) {
	const user = await getAuthenticatedUser(request, env);
	if (!user) throw new RewriteError('يلزم تسجيل الدخول بحساب المدير.', 401);
	if (user.role !== 'admin') throw new RewriteError('لا تملك صلاحية إعادة صياغة المقالات.', 403);
	if (!(await isMfaEnabled(env, user.id))) throw new RewriteError('يلزم تفعيل التحقق بخطوتين قبل استخدام أدوات الإدارة.', 403);
	if (!(await isCurrentSessionMfaVerified(request, env))) throw new RewriteError('يلزم تسجيل دخول مكتمل بالتحقق بخطوتين.', 401);
	return user;
}

function normalizeInput(payload) {
	const title = String(payload?.title || '').trim().replace(/[\r\n\t]+/g, ' ').slice(0, MAX_TITLE_LENGTH);
	const description = String(payload?.description || '').trim().replace(/[\r\n\t]+/g, ' ').slice(0, MAX_DESCRIPTION_LENGTH);
	const bodyHtml = String(payload?.bodyHtml || '').trim();
	if (!title || title.length < 5) throw new RewriteError('اكتب عنوان المقال قبل إعادة الصياغة.');
	if (!bodyHtml) throw new RewriteError('محتوى المقال فارغ.');
	if (encoder.encode(bodyHtml).byteLength > MAX_INPUT_BYTES) throw new RewriteError('نص المقال كبير جدًا لإعادة الصياغة دفعة واحدة.');
	if (/data:image\//i.test(bodyHtml)) throw new RewriteError('أعد المحاولة من محرر الإدارة حتى تُحمى الصور قبل إرسال النص لإعادة الصياغة.');
	return { title, description, bodyHtml };
}

function outputText(response) {
	if (typeof response?.output_text === 'string' && response.output_text.trim()) return response.output_text.trim();
	const parts = [];
	for (const item of Array.isArray(response?.output) ? response.output : []) {
		for (const content of Array.isArray(item?.content) ? item.content : []) {
			if (content?.type === 'output_text' && typeof content.text === 'string') parts.push(content.text);
		}
	}
	return parts.join('\n').trim();
}

function stripCodeFence(value) {
	return String(value || '')
		.replace(/^\s*```(?:html|html5)?\s*/i, '')
		.replace(/\s*```\s*$/i, '')
		.trim();
}

function verifyPreservedTokens(source, rewritten) {
	const expected = [...new Set(source.match(PRESERVE_TOKEN) || [])];
	for (const token of expected) {
		const count = rewritten.split(token).length - 1;
		if (count !== 1) throw new RewriteError(`لم تحافظ إعادة الصياغة على العنصر المحمي ${token}. لم يتم تطبيق النتيجة.`, 502);
	}
}

function rejectUnsafeMarkup(html) {
	if (/<\/?(?:script|style|form|object|embed|meta|link|base)\b/i.test(html)) {
		throw new RewriteError('أرجعت خدمة إعادة الصياغة عناصر HTML غير مسموحة. لم يتم تطبيق النتيجة.', 502);
	}
	if (/\b(?:href|src)\s*=\s*["']\s*(?:javascript:|data:|blob:)/i.test(html)) {
		throw new RewriteError('أرجعت خدمة إعادة الصياغة رابطًا غير آمن. لم يتم تطبيق النتيجة.', 502);
	}
}

async function rewriteArticle(request, env) {
	requireSameOriginPost(request);
	await requireAdminMfa(request, env);
	if (!env.OPENAI_API_KEY) throw new RewriteError('ميزة إعادة الصياغة تحتاج إعداد OPENAI_API_KEY في أسرار Cloudflare Pages.', 503);

	let payload;
	try {
		payload = await request.json();
	} catch {
		throw new RewriteError('بيانات إعادة الصياغة غير صالحة.');
	}
	const article = normalizeInput(payload);
	const model = String(env.OPENAI_ARTICLE_MODEL || DEFAULT_MODEL).trim() || DEFAULT_MODEL;

	const instructions = [
		'أنت محرر تقني لموقع HAKAMIQ العربي.',
		'أعد صياغة جسم المقال ليصبح عربيًا طبيعيًا وواضحًا ومتماسكًا مع تحسين القراءة فقط، من دون اختلاق معلومات جديدة.',
		'لا تغيّر الحقائق أو الأرقام أو الإصدارات أو أسماء البرامج والمشروعات أو مسارات الملفات أو الأوامر أو الروابط أو الاقتباسات التقنية.',
		'لا تضف مقدمة عامة أو خاتمة إن لم تكن موجودة في المصدر، ولا تحذف خطوات أو تحذيرات أو شروطًا مهمة.',
		'حافظ على كل رمز بالشكل [[HAKAMIQ_PRESERVE_0001]] وما شابهه حرفيًا مرة واحدة وفي موضعه المنطقي؛ هذه الرموز تمثل صورًا أو كودًا أو جداول أو وسائط لا يجوز تعديلها.',
		'أخرج HTML5 fragment فقط من دون Markdown fences ومن دون عناصر html أو head أو body أو article أو h1 أو style أو script.',
		'استخدم بنية دلالية بسيطة: p و h2 و h3 و h4 و ul و ol و li و strong و em و blockquote و pre و code و kbd و a و figure و figcaption و table و thead و tbody و tr و th و td و details و summary و hr و br عند الحاجة.',
		'لا تكرر عنوان المقال داخل الجسم. اجعل أول مستوى للعناوين الداخلية h2 ثم h3 عند الحاجة.',
		'لا تضف classes أو inline styles أو JavaScript.',
	].join('\n');

	const userInput = [
		`عنوان المقال: ${article.title}`,
		article.description ? `الوصف المختصر للسياق: ${article.description}` : '',
		'جسم المقال المطلوب إعادة صياغته:',
		article.bodyHtml,
	].filter(Boolean).join('\n\n');

	let response;
	try {
		response = await fetch('https://api.openai.com/v1/responses', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.OPENAI_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				model,
				store: false,
				reasoning: { effort: 'low' },
				instructions,
				input: userInput,
				max_output_tokens: 16000,
				text: { verbosity: 'medium' },
			}),
		});
	} catch (error) {
		console.error('HAKAMIQ OpenAI rewrite request failed', error);
		throw new RewriteError('تعذر الاتصال بخدمة إعادة الصياغة حاليًا.', 502);
	}

	const openaiPayload = await response.json().catch(() => ({}));
	if (!response.ok) {
		const detail = typeof openaiPayload?.error?.message === 'string' ? openaiPayload.error.message : '';
		console.error('HAKAMIQ OpenAI rewrite API error', response.status, detail);
		throw new RewriteError(response.status === 401 ? 'مفتاح OpenAI غير صالح أو غير مفعّل.' : 'فشلت خدمة إعادة الصياغة. أعد المحاولة لاحقًا.', 502);
	}

	const rewritten = stripCodeFence(outputText(openaiPayload));
	if (!rewritten || rewritten.length < 20) throw new RewriteError('لم تُرجع خدمة إعادة الصياغة محتوى صالحًا.', 502);
	verifyPreservedTokens(article.bodyHtml, rewritten);
	rejectUnsafeMarkup(rewritten);

	return json({ rewritten: true, bodyHtml: rewritten, model: openaiPayload.model || model });
}

export async function onRequest(context) {
	try {
		return await rewriteArticle(context.request, context.env);
	} catch (error) {
		if (error instanceof RewriteError || error instanceof AuthError) return json({ error: error.message }, error.status || 400);
		console.error('HAKAMIQ article rewrite failure', error);
		return json({ error: 'حدث خطأ داخلي أثناء إعادة صياغة المقال.' }, 500);
	}
}
