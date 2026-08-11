(() => {
	const isVisible = (element) => {
		if (!(element instanceof HTMLElement)) return false;
		if (element.hidden) return false;
		for (let node = element.parentElement; node; node = node.parentElement) {
			if (node.hidden) return false;
			if (node.matches('[data-blog-sidebar]')) break;
		}
		return true;
	};

	const initializeTree = (tree) => {
		if (!(tree instanceof HTMLElement) || tree.dataset.treeInitialized === 'true') return;
		tree.dataset.treeInitialized = 'true';
		tree.setAttribute('role', 'tree');
		tree.setAttribute('aria-label', 'أقسام المقالات');

		const groups = Array.from(tree.querySelectorAll('[data-category-group]'));
		for (const group of groups) {
			const trigger = group.querySelector('[data-accordion-trigger]');
			const panel = group.querySelector('[data-accordion-panel]');
			if (trigger instanceof HTMLElement) {
				trigger.setAttribute('role', 'treeitem');
				trigger.setAttribute('aria-level', '1');
			}
			if (panel instanceof HTMLElement) {
				panel.setAttribute('role', 'group');
				for (const link of panel.querySelectorAll('[data-category-link]')) {
					if (!(link instanceof HTMLElement)) continue;
					link.setAttribute('role', 'treeitem');
					link.setAttribute('aria-level', '2');
				}
			}
		}

		const allItems = () => Array.from(tree.querySelectorAll('[role="treeitem"]')).filter(isVisible);

		const setRovingFocus = (target) => {
			for (const item of tree.querySelectorAll('[role="treeitem"]')) {
				if (item instanceof HTMLElement) item.tabIndex = item === target ? 0 : -1;
			}
		};

		const syncRovingFocus = () => {
			const visible = allItems();
			if (visible.length === 0) return;
			const current = visible.find((item) => item.getAttribute('aria-current') === 'page');
			const focused = document.activeElement instanceof HTMLElement && tree.contains(document.activeElement)
				? document.activeElement.closest('[role="treeitem"]')
				: null;
			const target = focused instanceof HTMLElement && isVisible(focused)
				? focused
				: current instanceof HTMLElement ? current : visible[0];
			if (target instanceof HTMLElement) setRovingFocus(target);
		};

		const focusItem = (item) => {
			if (!(item instanceof HTMLElement)) return;
			setRovingFocus(item);
			item.focus();
		};

		const focusRelative = (current, delta) => {
			const items = allItems();
			const index = items.indexOf(current);
			if (index < 0) return;
			const next = items[index + delta];
			if (next instanceof HTMLElement) focusItem(next);
		};

		tree.addEventListener('focusin', (event) => {
			const item = event.target instanceof Element ? event.target.closest('[role="treeitem"]') : null;
			if (item instanceof HTMLElement) setRovingFocus(item);
		});

		tree.addEventListener('click', () => queueMicrotask(syncRovingFocus));
		tree.addEventListener('input', () => queueMicrotask(syncRovingFocus));

		tree.addEventListener('keydown', (event) => {
			const current = event.target instanceof Element ? event.target.closest('[role="treeitem"]') : null;
			if (!(current instanceof HTMLElement)) return;

			switch (event.key) {
				case 'ArrowDown':
					event.preventDefault();
					focusRelative(current, 1);
					break;
				case 'ArrowUp':
					event.preventDefault();
					focusRelative(current, -1);
					break;
				case 'Home': {
					event.preventDefault();
					const first = allItems()[0];
					if (first instanceof HTMLElement) focusItem(first);
					break;
				}
				case 'End': {
					event.preventDefault();
					const items = allItems();
					const last = items[items.length - 1];
					if (last instanceof HTMLElement) focusItem(last);
					break;
				}
				case 'ArrowRight': {
					const level = current.getAttribute('aria-level');
					if (level !== '1') break;
					const group = current.closest('[data-category-group]');
					const panel = group?.querySelector('[data-accordion-panel]');
					if (!(panel instanceof HTMLElement)) break;
					event.preventDefault();
					if (current.getAttribute('aria-expanded') !== 'true') {
						current.click();
						window.setTimeout(() => syncRovingFocus(), 0);
					} else {
						const child = Array.from(panel.querySelectorAll('[role="treeitem"]')).find(isVisible);
						if (child instanceof HTMLElement) focusItem(child);
					}
					break;
				}
				case 'ArrowLeft': {
					const level = current.getAttribute('aria-level');
					if (level === '1' && current.getAttribute('aria-expanded') === 'true') {
						event.preventDefault();
						current.click();
						window.setTimeout(() => focusItem(current), 0);
						break;
					}
					if (level === '2') {
						const parent = current.closest('[data-category-group]')?.querySelector('[data-accordion-trigger]');
						if (parent instanceof HTMLElement) {
							event.preventDefault();
							focusItem(parent);
						}
					}
					break;
				}
			}
		});

		syncRovingFocus();
	};

	const initializePageSizeControl = () => {
		const form = document.querySelector('#category-page-size-form');
		const select = document.querySelector('#category-page-size');
		if (!(form instanceof HTMLFormElement) || !(select instanceof HTMLSelectElement)) return;
		if (form.dataset.pageSizeInitialized === 'true') return;
		form.dataset.pageSizeInitialized = 'true';

		form.querySelector('button[type="submit"]')?.remove();

		if (!document.querySelector('#category-page-size-focus-style')) {
			const style = document.createElement('style');
			style.id = 'category-page-size-focus-style';
			style.textContent = `
				.category-page-size select:focus,
				.category-page-size select:focus-visible {
					outline: none !important;
					box-shadow: none !important;
					border-color: var(--color-brand-stroke-1) !important;
				}
			`;
			document.head.append(style);
		}

		select.addEventListener('change', () => {
			form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
		});
	};

	const initialize = () => {
		for (const tree of document.querySelectorAll('[data-category-groups]')) initializeTree(tree);
		initializePageSizeControl();
	};

	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
	else initialize();
})();
