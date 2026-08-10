(() => {
	'use strict';

	const MAX_IMAGE_BYTES = 6 * 1024 * 1024;
	const IMAGE_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif']);
	const ALLOWED_TAGS = new Set([
		'p', 'br', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'u', 's',
		'blockquote', 'pre', 'code', 'kbd', 'a', 'img', 'figure', 'figcaption', 'hr',
		'table', 'thead', 'tbody', 'tr', 'th', 'td', 'details', 'summary', 'iframe',
	]);
	const BLOCK_TAGS = new Set([
		'p', 'h2', 'h3', 'h4', 'ul', 'ol', 'blockquote', 'pre', 'figure', 'table',
		'details', 'hr',
	]);
	const DROP_TAGS = new Set([
		'script', 'style', 'form', 'input', 'button', 'select', 'textarea', 'object',
		'embed', 'meta', 'link', 'base', 'svg', 'math',
	]);

	function escapeHtml(value) {
		return String(value)
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;')
			.replaceAll('"', '&quot;')
			.replaceAll("'", '&#39;');
	}

	function escapeAttribute(value) {
		return escapeHtml(value).replaceAll('`', '&#96;');
	}

	function safeHref(value) {
		const candidate = String(value || '').trim();
		if (/^(?:\/|#)/.test(candidate)) return candidate;
		if (/^(?:https?:|mailto:|tel:)/i.test(candidate)) return candidate;
		return '';
	}

	function safeImageSrc(value) {
		const candidate = String(value || '').trim();
		if (candidate.startsWith('/media/')) return candidate;
		if (/^https:\/\//i.test(candidate)) return candidate;
		if (/^data:image\/(?:png|jpe?g|webp|gif);base64,[a-z0-9+/=]+$/i.test(candidate)) return candidate;
		return '';
	}

	function safeYouTubeEmbed(value) {
		try {
			const url = new URL(String(value || ''));
			if (!['www.youtube.com', 'youtube.com', 'www.youtube-nocookie.com', 'youtube-nocookie.com'].includes(url.hostname)) return '';
			const parts = url.pathname.split('/').filter(Boolean);
			if (parts[0] !== 'embed' || !/^[A-Za-z0-9_-]{6,20}$/.test(parts[1] || '')) return '';
			return `https://www.youtube-nocookie.com/embed/${parts[1]}`;
		} catch {
			return '';
		}
	}

	function renameElement(element, tagName) {
		if (element.localName === tagName) return element;
		const replacement = element.ownerDocument.createElement(tagName);
		while (element.firstChild) replacement.append(element.firstChild);
		element.replaceWith(replacement);
		return replacement;
	}

	function unwrapElement(element) {
		element.replaceWith(...element.childNodes);
	}

	function normalizeHtmlFragment(html) {
		const parser = new DOMParser();
		const document = parser.parseFromString(`<body>${String(html || '')}</body>`, 'text/html');
		const body = document.body;

		for (const element of [...body.querySelectorAll('*')].reverse()) {
			if (!element.isConnected) continue;
			let name = element.localName.toLowerCase();

			if (DROP_TAGS.has(name)) {
				element.remove();
				continue;
			}

			if (name === 'h1') {
				element.replaceWith(renameElement(element, 'h2'));
				name = 'h2';
			}
			if (name === 'b') {
				element.replaceWith(renameElement(element, 'strong'));
				name = 'strong';
			}
			if (name === 'i') {
				element.replaceWith(renameElement(element, 'em'));
				name = 'em';
			}

			if (name === 'span' || name === 'font' || name === 'center' || name === 'article' || name === 'section' || name === 'main') {
				unwrapElement(element);
				continue;
			}

			if (name === 'div') {
				const hasBlockChild = [...element.children].some((child) => BLOCK_TAGS.has(child.localName.toLowerCase()));
				if (hasBlockChild) {
					unwrapElement(element);
				} else {
					renameElement(element, 'p');
				}
				continue;
			}

			if (!ALLOWED_TAGS.has(name)) {
				unwrapElement(element);
				continue;
			}

			const source = new Map([...element.attributes].map((attribute) => [attribute.name.toLowerCase(), attribute.value]));
			for (const attribute of [...element.attributes]) element.removeAttribute(attribute.name);

			const dir = source.get('dir');
			if (dir === 'rtl' || dir === 'ltr' || dir === 'auto') element.setAttribute('dir', dir);

			if (name === 'a') {
				const href = safeHref(source.get('href'));
				if (!href) {
					unwrapElement(element);
					continue;
				}
				element.setAttribute('href', href);
				if (source.get('title')) element.setAttribute('title', source.get('title').slice(0, 180));
				if (source.get('target') === '_blank') {
					element.setAttribute('target', '_blank');
					element.setAttribute('rel', 'noopener noreferrer');
				}
			}

			if (name === 'img') {
				const src = safeImageSrc(source.get('src'));
				if (!src) {
					element.remove();
					continue;
				}
				element.setAttribute('src', src);
				element.setAttribute('alt', String(source.get('alt') || 'صورة توضيحية').trim().slice(0, 240) || 'صورة توضيحية');
				element.setAttribute('loading', 'lazy');
				element.setAttribute('decoding', 'async');
				if (source.get('title')) element.setAttribute('title', source.get('title').slice(0, 180));
			}

			if (name === 'iframe') {
				const src = safeYouTubeEmbed(source.get('src'));
				if (!src) {
					element.remove();
					continue;
				}
				element.setAttribute('src', src);
				element.setAttribute('title', String(source.get('title') || 'فيديو YouTube').slice(0, 180));
				element.setAttribute('loading', 'lazy');
				element.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
				element.setAttribute('allowfullscreen', '');
			}

			if (name === 'td' || name === 'th') {
				for (const attribute of ['colspan', 'rowspan']) {
					const value = Number(source.get(attribute));
					if (Number.isInteger(value) && value >= 1 && value <= 20) element.setAttribute(attribute, String(value));
				}
			}

			if (name === 'ol') {
				const start = Number(source.get('start'));
				if (Number.isInteger(start) && start >= 1 && start <= 10000) element.setAttribute('start', String(start));
			}

			if (name === 'li') {
				const value = Number(source.get('value'));
				if (Number.isInteger(value) && value >= 1 && value <= 10000) element.setAttribute('value', String(value));
			}

			if (name === 'details' && source.has('open')) element.setAttribute('open', '');
		}

		for (const paragraph of [...body.querySelectorAll('p')]) {
			const meaningful = paragraph.textContent.replace(/\u00a0/g, ' ').trim() || paragraph.querySelector('img,iframe,br');
			if (!meaningful) paragraph.remove();
		}

		return body.innerHTML.trim();
	}

	function plainTextToHtml5(text) {
		const normalized = String(text || '').replace(/\r\n?/g, '\n').trim();
		if (!normalized) return '';
		const blocks = normalized.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
		return blocks.map((block) => {
			const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
			if (!lines.length) return '';

			const heading = lines.length === 1 ? lines[0].match(/^(#{1,4})\s+(.+)$/) : null;
			if (heading) {
				const level = Math.min(4, Math.max(2, heading[1].length));
				return `<h${level}>${escapeHtml(heading[2])}</h${level}>`;
			}

			if (lines.every((line) => /^[-*•]\s+/.test(line))) {
				return `<ul>${lines.map((line) => `<li>${escapeHtml(line.replace(/^[-*•]\s+/, ''))}</li>`).join('')}</ul>`;
			}

			if (lines.every((line) => /^\d+[.)]\s+/.test(line))) {
				return `<ol>${lines.map((line) => `<li>${escapeHtml(line.replace(/^\d+[.)]\s+/, ''))}</li>`).join('')}</ol>`;
			}

			return `<p>${lines.map(escapeHtml).join('<br>')}</p>`;
		}).join('\n');
	}

	function fileToDataUrl(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(String(reader.result || ''));
			reader.onerror = () => reject(new Error('تعذر قراءة الصورة من الحافظة.'));
			reader.readAsDataURL(file);
		});
	}

	function validateImage(file) {
		if (!IMAGE_TYPES.has(file.type)) throw new Error('صيغة الصورة الملصقة غير مدعومة. استخدم PNG أو JPG أو WebP أو GIF.');
		if (file.size <= 0 || file.size > MAX_IMAGE_BYTES) throw new Error('حجم الصورة الملصقة يتجاوز 6 ميجابايت.');
	}

	function start() {
		const editor = document.querySelector('#article-editor');
		const toolbar = document.querySelector('.admin-toolbar');
		const titleInput = document.querySelector('#article-title');
		const publishButton = document.querySelector('#publish-button');
		const publishFeedback = document.querySelector('#publish-feedback');
		if (!(editor instanceof HTMLElement) || !(toolbar instanceof HTMLElement)) return;

		function setFeedback(message, kind = '') {
			if (!(publishFeedback instanceof HTMLElement)) return;
			publishFeedback.textContent = message;
			publishFeedback.dataset.kind = kind;
			publishFeedback.classList.toggle('admin-hidden', !message);
		}

		function emitChange() {
			editor.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText' }));
		}

		function selectionRangeInsideEditor() {
			const selection = window.getSelection();
			if (!selection || !selection.rangeCount) return null;
			const range = selection.getRangeAt(0);
			const node = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
				? range.commonAncestorContainer
				: range.commonAncestorContainer.parentElement;
			return node && (node === editor || editor.contains(node)) ? range.cloneRange() : null;
		}

		function restoreRange(range) {
			const selection = window.getSelection();
			if (!selection) return;
			selection.removeAllRanges();
			if (range) {
				selection.addRange(range);
				return;
			}
			const fallback = document.createRange();
			fallback.selectNodeContents(editor);
			fallback.collapse(false);
			selection.addRange(fallback);
		}

		function insertHtml(html, range = selectionRangeInsideEditor()) {
			editor.focus();
			restoreRange(range);
			document.execCommand('insertHTML', false, html);
			emitChange();
		}

		const html5Button = document.createElement('button');
		html5Button.type = 'button';
		html5Button.className = 'admin-tool';
		html5Button.id = 'html5-normalize-button';
		html5Button.textContent = 'HTML5';
		html5Button.setAttribute('aria-label', 'تنظيف وبناء محتوى المقال بصيغة HTML5 دلالية');
		html5Button.title = 'تنظيف التنسيق الموروث وتحويل جسم المقال إلى HTML5 نظيف';
		toolbar.append(html5Button);

		const rewriteButton = document.createElement('button');
		rewriteButton.type = 'button';
		rewriteButton.className = 'admin-tool';
		rewriteButton.id = 'ai-rewrite-button';
		rewriteButton.textContent = 'إعادة صياغة + HTML5';
		rewriteButton.setAttribute('aria-label', 'إعادة صياغة المقال بالذكاء الاصطناعي وترتيبه بصيغة HTML5');
		toolbar.append(rewriteButton);

		const pasteHint = document.createElement('p');
		pasteHint.className = 'admin-field-help';
		pasteHint.textContent = 'يمكنك لصق النص أو صورة مباشرة داخل المحرر بـ Ctrl+V. الصور تُدرج داخل المقال تلقائيًا، والتنظيف إلى HTML5 يتم قبل النشر.';
		toolbar.insertAdjacentElement('afterend', pasteHint);

		html5Button.addEventListener('click', () => {
			const normalized = normalizeHtmlFragment(editor.innerHTML);
			editor.innerHTML = normalized;
			emitChange();
			setFeedback('تم تنظيف جسم المقال وتحويله إلى HTML5 دلالي بدون تنسيقات خارجية.', 'success');
		});

		editor.addEventListener('paste', async (event) => {
			const clipboard = event.clipboardData;
			if (!clipboard) return;
			const imageFiles = [...clipboard.items]
				.filter((item) => item.kind === 'file' && item.type.startsWith('image/'))
				.map((item) => item.getAsFile())
				.filter(Boolean);

			if (imageFiles.length) {
				event.preventDefault();
				const range = selectionRangeInsideEditor();
				try {
					const title = titleInput instanceof HTMLInputElement ? titleInput.value.trim() : '';
					const figures = [];
					for (const file of imageFiles) {
						validateImage(file);
						const dataUrl = await fileToDataUrl(file);
						const alt = title ? `صورة توضيحية من ${title}` : 'صورة توضيحية';
						figures.push(`<figure><img src="${dataUrl}" alt="${escapeAttribute(alt)}" loading="lazy" decoding="async"><figcaption></figcaption></figure><p><br></p>`);
					}
					insertHtml(figures.join('\n'), range);
					setFeedback(`تم لصق ${figures.length === 1 ? 'الصورة' : `${figures.length} صور`} داخل المقال.`, 'success');
				} catch (error) {
					setFeedback(error instanceof Error ? error.message : 'تعذر لصق الصورة.', 'error');
				}
				return;
			}

			const html = clipboard.getData('text/html');
			const text = clipboard.getData('text/plain');
			if (!html && !text) return;
			event.preventDefault();
			const cleaned = html ? normalizeHtmlFragment(html) : plainTextToHtml5(text);
			insertHtml(cleaned);
		});

		function protectBlocks(html) {
			const blocks = [];
			const protectedHtml = String(html || '').replace(
				/<figure\b[\s\S]*?<\/figure>|<iframe\b[\s\S]*?<\/iframe>|<pre\b[\s\S]*?<\/pre>|<table\b[\s\S]*?<\/table>|<img\b[^>]*>|<code\b[\s\S]*?<\/code>/gi,
				(block) => {
					const token = `[[HAKAMIQ_PRESERVE_${String(blocks.length + 1).padStart(4, '0')}]]`;
					blocks.push({ token, html: block });
					return token;
				},
			);
			return { protectedHtml, blocks };
		}

		function restoreBlocks(html, blocks) {
			let restored = String(html || '');
			for (const block of blocks) {
				if (!restored.includes(block.token)) throw new Error(`فقدت إعادة الصياغة العنصر المحمي ${block.token}. لم يتم استبدال محتوى المحرر.`);
				restored = restored.replaceAll(block.token, block.html);
			}
			return restored;
		}

		async function rewriteWithAi() {
			const originalText = editor.textContent.replace(/\s+/g, ' ').trim();
			if (originalText.length < 20) throw new Error('أدخل محتوى المقال أولًا قبل إعادة الصياغة.');
			const normalized = normalizeHtmlFragment(editor.innerHTML);
			const protectedArticle = protectBlocks(normalized);
			const response = await fetch('/api/admin/rewrite', {
				method: 'POST',
				credentials: 'same-origin',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					title: titleInput instanceof HTMLInputElement ? titleInput.value.trim() : '',
					description: document.querySelector('#article-description')?.value?.trim?.() || '',
					bodyHtml: protectedArticle.protectedHtml,
				}),
			});
			const payload = await response.json().catch(() => ({}));
			if (!response.ok) throw new Error(payload.error || 'تعذر إعادة صياغة المقال.');
			const restored = restoreBlocks(payload.bodyHtml || '', protectedArticle.blocks);
			const finalHtml = normalizeHtmlFragment(restored);
			if (!finalHtml || new DOMParser().parseFromString(finalHtml, 'text/html').body.textContent.trim().length < 20) {
				throw new Error('نتيجة إعادة الصياغة غير صالحة. لم يتم استبدال محتوى المحرر.');
			}
			editor.innerHTML = finalHtml;
			emitChange();
			return payload.model || '';
		}

		rewriteButton.addEventListener('click', async () => {
			const previousText = rewriteButton.textContent;
			rewriteButton.disabled = true;
			rewriteButton.textContent = 'جاري إعادة الصياغة…';
			setFeedback('يتم الآن إعادة صياغة النص وترتيبه كـ HTML5 مع الحفاظ على الصور والكود والجداول…');
			try {
				const model = await rewriteWithAi();
				setFeedback(`تمت إعادة الصياغة وبناء HTML5${model ? ` باستخدام ${model}` : ''}. راجع المعاينة ثم انشر المقال.`, 'success');
			} catch (error) {
				setFeedback(error instanceof Error ? error.message : 'تعذر إعادة صياغة المقال.', 'error');
			} finally {
				rewriteButton.disabled = false;
				rewriteButton.textContent = previousText;
			}
		});

		if (publishButton instanceof HTMLButtonElement) {
			publishButton.addEventListener('click', () => {
				const normalized = normalizeHtmlFragment(editor.innerHTML);
				if (normalized !== editor.innerHTML.trim()) {
					editor.innerHTML = normalized;
					emitChange();
				}
			}, true);
		}
	}

	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
	else start();
})();
