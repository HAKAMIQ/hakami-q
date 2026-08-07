(() => {
	const query = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';
	const media = window.matchMedia(query);

	const init = () => {
		const header = document.querySelector('[data-site-header]');
		if (!(header instanceof HTMLElement) || header.dataset.desktopStripInitialized === 'true') return;

		const nav = header.querySelector('.nav-inner');
		const mainNav = header.querySelector('.main-nav');
		const bar = header.querySelector('.menu-bar');
		if (!(nav instanceof HTMLElement) || !(mainNav instanceof HTMLElement) || !(bar instanceof HTMLElement)) return;

		header.dataset.desktopStripInitialized = 'true';

		const indicator = document.createElement('span');
		indicator.className = 'nav-hover-indicator';
		indicator.setAttribute('aria-hidden', 'true');
		bar.append(indicator);

		const topTargets = Array.from(
			bar.querySelectorAll(':scope > .home-menu-link, :scope > .menu-direct, :scope > [data-menu-group] > .menu-trigger'),
		).filter((item) => item instanceof HTMLElement);

		const topGroups = Array.from(header.querySelectorAll('[data-menu-group]')).filter((item) => item instanceof HTMLElement);
		const nestedGroups = Array.from(header.querySelectorAll('[data-submenu-group]')).filter((item) => item instanceof HTMLElement);

		let pointerId = null;
		let dragStartX = 0;
		let dragStartScroll = 0;
		let dragMoved = false;
		let suppressClick = false;

		const closeOpenMenus = () => {
			for (const group of [...topGroups, ...nestedGroups]) {
				group.classList.remove('is-open');
				const trigger = group.querySelector(':scope > button');
				if (trigger instanceof HTMLButtonElement) trigger.setAttribute('aria-expanded', 'false');
			}
		};

		const getActiveTarget = () => {
			const selected = bar.querySelector('.menu-direct.is-active, .menu-trigger.has-active-child');
			if (selected instanceof HTMLElement) return selected;
			if (window.location.pathname === '/') {
				const home = bar.querySelector('.home-menu-link');
				if (home instanceof HTMLElement) return home;
			}
			return null;
		};

		const moveIndicator = (target) => {
			if (!media.matches || !(target instanceof HTMLElement)) return;
			const targetRect = target.getBoundingClientRect();
			const barRect = bar.getBoundingClientRect();
			const x = targetRect.left - barRect.left;
			indicator.style.setProperty('--nav-indicator-x', `${Math.round(x)}px`);
			indicator.style.setProperty('--nav-indicator-width', `${Math.round(targetRect.width)}px`);
			indicator.classList.add('is-visible');
		};

		const restoreIndicator = () => {
			const active = getActiveTarget();
			if (active) moveIndicator(active);
			else indicator.classList.remove('is-visible');
		};

		const updateEdges = () => {
			if (!media.matches) {
				mainNav.classList.remove('can-scroll-left', 'can-scroll-right');
				return;
			}
			const maxScroll = Math.max(0, nav.scrollWidth - nav.clientWidth);
			mainNav.classList.toggle('can-scroll-left', nav.scrollLeft > 2);
			mainNav.classList.toggle('can-scroll-right', nav.scrollLeft < maxScroll - 2);
		};

		const ensureVisible = (target) => {
			if (!media.matches || !(target instanceof HTMLElement)) return;
			const navRect = nav.getBoundingClientRect();
			const targetRect = target.getBoundingClientRect();
			const safeGap = 28;
			if (targetRect.left < navRect.left + safeGap) {
				nav.scrollBy({ left: targetRect.left - navRect.left - safeGap, behavior: 'smooth' });
			} else if (targetRect.right > navRect.right - safeGap) {
				nav.scrollBy({ left: targetRect.right - navRect.right + safeGap, behavior: 'smooth' });
			}
		};

		const placeTopPanel = (group) => {
			if (!media.matches || !(group instanceof HTMLElement) || !group.classList.contains('is-open')) return;
			const trigger = group.querySelector(':scope > .menu-trigger');
			const panel = group.querySelector(':scope > [data-menu-panel]');
			if (!(trigger instanceof HTMLElement) || !(panel instanceof HTMLElement)) return;

			const triggerRect = trigger.getBoundingClientRect();
			const panelWidth = panel.getBoundingClientRect().width || 288;
			const gap = 12;
			const left = Math.max(gap, Math.min(triggerRect.left, window.innerWidth - panelWidth - gap));
			const top = triggerRect.bottom;
			panel.style.setProperty('--hq-panel-left', `${Math.round(left)}px`);
			panel.style.setProperty('--hq-panel-top', `${Math.round(top)}px`);
		};

		const placeSubmenu = (group) => {
			if (!media.matches || !(group instanceof HTMLElement) || !group.classList.contains('is-open')) return;
			const trigger = group.querySelector(':scope > .submenu-trigger');
			const panel = group.querySelector(':scope > [data-submenu-panel]');
			if (!(trigger instanceof HTMLElement) || !(panel instanceof HTMLElement)) return;

			const triggerRect = trigger.getBoundingClientRect();
			const panelRect = panel.getBoundingClientRect();
			const width = panelRect.width || 272;
			const height = panelRect.height || 220;
			const gap = 8;
			let left = triggerRect.right + gap;
			let opensStart = false;
			if (left + width > window.innerWidth - gap) {
				left = triggerRect.left - width - gap;
				opensStart = true;
			}
			const top = Math.max(gap, Math.min(triggerRect.top - 6, window.innerHeight - height - gap));
			group.classList.toggle('opens-start', opensStart);
			panel.style.setProperty('--hq-submenu-left', `${Math.round(Math.max(gap, left))}px`);
			panel.style.setProperty('--hq-submenu-top', `${Math.round(top)}px`);
		};

		const placeOpenPanels = () => {
			for (const group of topGroups) placeTopPanel(group);
			for (const group of nestedGroups) placeSubmenu(group);
		};

		for (const target of topTargets) {
			target.addEventListener('pointerenter', () => {
				if (!media.matches || nav.classList.contains('is-dragging')) return;
				ensureVisible(target);
				moveIndicator(target);
				requestAnimationFrame(() => requestAnimationFrame(placeOpenPanels));
			});
			target.addEventListener('focus', () => {
				if (!media.matches) return;
				ensureVisible(target);
				moveIndicator(target);
				requestAnimationFrame(() => requestAnimationFrame(placeOpenPanels));
			});
		}

		for (const group of topGroups) {
			group.addEventListener('pointerenter', () => requestAnimationFrame(() => requestAnimationFrame(() => placeTopPanel(group))));
			group.addEventListener('focusin', () => requestAnimationFrame(() => requestAnimationFrame(() => placeTopPanel(group))));
			const trigger = group.querySelector(':scope > .menu-trigger');
			if (trigger instanceof HTMLElement) {
				trigger.addEventListener('click', () => requestAnimationFrame(() => requestAnimationFrame(() => placeTopPanel(group))));
			}
		}

		for (const group of nestedGroups) {
			group.addEventListener('pointerenter', () => requestAnimationFrame(() => requestAnimationFrame(() => placeSubmenu(group))));
			group.addEventListener('focusin', () => requestAnimationFrame(() => requestAnimationFrame(() => placeSubmenu(group))));
			const trigger = group.querySelector(':scope > .submenu-trigger');
			if (trigger instanceof HTMLElement) {
				trigger.addEventListener('click', () => requestAnimationFrame(() => requestAnimationFrame(() => placeSubmenu(group))));
			}
		}

		nav.addEventListener('pointerleave', () => {
			if (!nav.classList.contains('is-dragging')) restoreIndicator();
		});

		nav.addEventListener('pointerdown', (event) => {
			if (!media.matches || event.button !== 0 || pointerId !== null) return;
			if (event.target instanceof Element && event.target.closest('.menu-panel, .submenu-panel')) return;
			pointerId = event.pointerId;
			dragStartX = event.clientX;
			dragStartScroll = nav.scrollLeft;
			dragMoved = false;
			nav.setPointerCapture?.(event.pointerId);
		});

		nav.addEventListener('pointermove', (event) => {
			if (!media.matches || pointerId !== event.pointerId) return;
			const delta = event.clientX - dragStartX;
			if (!dragMoved && Math.abs(delta) > 5) {
				dragMoved = true;
				nav.classList.add('is-dragging');
				closeOpenMenus();
			}
			if (!dragMoved) return;
			event.preventDefault();
			nav.scrollLeft = dragStartScroll - delta;
			updateEdges();
		});

		const endDrag = (event) => {
			if (pointerId !== event.pointerId) return;
			if (dragMoved) {
				suppressClick = true;
				window.setTimeout(() => { suppressClick = false; }, 0);
			}
			pointerId = null;
			nav.classList.remove('is-dragging');
			restoreIndicator();
			try { nav.releasePointerCapture?.(event.pointerId); } catch {}
		};

		nav.addEventListener('pointerup', endDrag);
		nav.addEventListener('pointercancel', endDrag);
		nav.addEventListener('click', (event) => {
			if (!suppressClick) return;
			event.preventDefault();
			event.stopImmediatePropagation();
		}, true);

		nav.addEventListener('wheel', (event) => {
			if (!media.matches || nav.scrollWidth <= nav.clientWidth + 2) return;
			if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
			event.preventDefault();
			closeOpenMenus();
			nav.scrollLeft += event.deltaY;
			updateEdges();
		}, { passive: false });

		nav.addEventListener('scroll', () => {
			updateEdges();
			placeOpenPanels();
		}, { passive: true });

		window.addEventListener('resize', () => {
			updateEdges();
			placeOpenPanels();
			restoreIndicator();
		}, { passive: true });

		media.addEventListener('change', () => {
			closeOpenMenus();
			nav.classList.remove('is-dragging');
			updateEdges();
			restoreIndicator();
		});

		updateEdges();
		restoreIndicator();
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init, { once: true });
	} else {
		init();
	}
	document.addEventListener('astro:page-load', init);
})();
