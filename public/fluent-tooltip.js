(() => {
	const TOOLTIP_ID = 'global-fluent-tooltip';
	const HOVER_DELAY = 500;
	const GAP = 8;
	let currentAnchor = null;
	let showTimer = 0;
	let previousDescribedBy = null;

	const ensureTooltip = () => {
		let tooltip = document.getElementById(TOOLTIP_ID);
		if (tooltip) return tooltip;

		tooltip = document.createElement('div');
		tooltip.id = TOOLTIP_ID;
		tooltip.className = 'fui-tooltip-surface';
		tooltip.setAttribute('role', 'tooltip');
		tooltip.setAttribute('data-open', 'false');
		document.body.append(tooltip);
		return tooltip;
	};

	const clearTimer = () => {
		if (showTimer) window.clearTimeout(showTimer);
		showTimer = 0;
	};

	const restoreDescription = () => {
		if (!currentAnchor) return;
		if (previousDescribedBy) currentAnchor.setAttribute('aria-describedby', previousDescribedBy);
		else currentAnchor.removeAttribute('aria-describedby');
		previousDescribedBy = null;
	};

	const hide = () => {
		clearTimer();
		const tooltip = document.getElementById(TOOLTIP_ID);
		if (tooltip) tooltip.setAttribute('data-open', 'false');
		restoreDescription();
		currentAnchor = null;
	};

	const position = (anchor, tooltip) => {
		const anchorRect = anchor.getBoundingClientRect();
		const tooltipRect = tooltip.getBoundingClientRect();
		const viewportWidth = document.documentElement.clientWidth;
		const viewportHeight = document.documentElement.clientHeight;
		const direction = getComputedStyle(anchor).direction;
		const requested = anchor.dataset.tooltipPosition || 'block-start';

		let top = anchorRect.top - tooltipRect.height - GAP;
		let left = anchorRect.left + (anchorRect.width - tooltipRect.width) / 2;

		if (requested.startsWith('block-end')) top = anchorRect.bottom + GAP;
		if (requested.startsWith('inline-start')) {
			top = anchorRect.top + (anchorRect.height - tooltipRect.height) / 2;
			left = direction === 'rtl' ? anchorRect.right + GAP : anchorRect.left - tooltipRect.width - GAP;
		}
		if (requested.startsWith('inline-end')) {
			top = anchorRect.top + (anchorRect.height - tooltipRect.height) / 2;
			left = direction === 'rtl' ? anchorRect.left - tooltipRect.width - GAP : anchorRect.right + GAP;
		}

		if (requested.includes('span-inline-start')) {
			left = direction === 'rtl' ? anchorRect.right - tooltipRect.width : anchorRect.left;
		} else if (requested.includes('span-inline-end')) {
			left = direction === 'rtl' ? anchorRect.left : anchorRect.right - tooltipRect.width;
		}

		left = Math.max(GAP, Math.min(left, viewportWidth - tooltipRect.width - GAP));
		top = Math.max(GAP, Math.min(top, viewportHeight - tooltipRect.height - GAP));

		tooltip.style.left = `${Math.round(left)}px`;
		tooltip.style.top = `${Math.round(top)}px`;
	};

	const show = (anchor) => {
		const text = anchor.dataset.tooltip?.trim();
		if (!text) return;

		const tooltip = ensureTooltip();
		if (currentAnchor && currentAnchor !== anchor) restoreDescription();
		currentAnchor = anchor;
		previousDescribedBy = anchor.getAttribute('aria-describedby');
		const describedBy = previousDescribedBy
			? `${previousDescribedBy} ${TOOLTIP_ID}`
			: TOOLTIP_ID;
		anchor.setAttribute('aria-describedby', describedBy);
		tooltip.textContent = text;
		tooltip.setAttribute('data-open', 'true');
		position(anchor, tooltip);
	};

	const scheduleShow = (anchor, delay) => {
		clearTimer();
		showTimer = window.setTimeout(() => {
			showTimer = 0;
			show(anchor);
		}, delay);
	};

	const normalizeNativeTitles = (root = document) => {
		for (const anchor of root.querySelectorAll('a[title], button[title], input[title], [tabindex][title]')) {
			if (!(anchor instanceof HTMLElement)) continue;
			const title = anchor.getAttribute('title')?.trim();
			if (title && !anchor.dataset.tooltip) anchor.dataset.tooltip = title;
			anchor.removeAttribute('title');
		}
	};

	const findAnchor = (target) => target instanceof Element ? target.closest('[data-tooltip]') : null;

	const initialize = () => {
		normalizeNativeTitles();

		document.addEventListener('pointerover', (event) => {
			if (event.pointerType === 'touch') return;
			const anchor = findAnchor(event.target);
			if (!(anchor instanceof HTMLElement)) return;
			scheduleShow(anchor, HOVER_DELAY);
		});

		document.addEventListener('pointerout', (event) => {
			const anchor = findAnchor(event.target);
			if (!(anchor instanceof HTMLElement)) return;
			if (event.relatedTarget instanceof Node && anchor.contains(event.relatedTarget)) return;
			hide();
		});

		document.addEventListener('focusin', (event) => {
			const anchor = findAnchor(event.target);
			if (!(anchor instanceof HTMLElement)) return;
			scheduleShow(anchor, 0);
		});

		document.addEventListener('focusout', (event) => {
			const anchor = findAnchor(event.target);
			if (!(anchor instanceof HTMLElement)) return;
			hide();
		});

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Escape') hide();
		});

		window.addEventListener('scroll', () => {
			if (!currentAnchor) return;
			const tooltip = document.getElementById(TOOLTIP_ID);
			if (tooltip) position(currentAnchor, tooltip);
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (!currentAnchor) return;
			const tooltip = document.getElementById(TOOLTIP_ID);
			if (tooltip) position(currentAnchor, tooltip);
		});
	};

	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
	else initialize();
})();
