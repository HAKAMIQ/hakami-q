(() => {
	'use strict';

	const initNavigationHover = () => {
		const header = document.querySelector('.site-header');
		if (!(header instanceof HTMLElement)) return;

		const desktop = window.matchMedia('(min-width: 921px)');
		const topMenus = Array.from(header.querySelectorAll('[data-menu-group]')).filter(
			(menu) => menu instanceof HTMLDetailsElement,
		);
		const nestedMenus = Array.from(header.querySelectorAll('[data-submenu-group]')).filter(
			(menu) => menu instanceof HTMLDetailsElement,
		);

		const closeNestedMenus = (except) => {
			for (const menu of nestedMenus) {
				if (menu !== except) menu.open = false;
			}
		};

		const closeTopMenus = (except) => {
			for (const menu of topMenus) {
				if (menu !== except) menu.open = false;
			}
		};

		for (const menu of topMenus) {
			const summary = menu.querySelector(':scope > summary');

			menu.addEventListener('mouseenter', () => {
				if (!desktop.matches) return;
				closeTopMenus(menu);
				closeNestedMenus();
				menu.open = true;
			});

			menu.addEventListener('mouseleave', () => {
				if (!desktop.matches) return;
				menu.open = false;
				for (const nested of menu.querySelectorAll('[data-submenu-group]')) {
					if (nested instanceof HTMLDetailsElement) nested.open = false;
				}
			});

			summary?.addEventListener('click', (event) => {
				if (!desktop.matches || event.detail === 0) return;
				event.preventDefault();
			});
		}

		for (const menu of nestedMenus) {
			const summary = menu.querySelector(':scope > summary');

			menu.addEventListener('mouseenter', () => {
				if (!desktop.matches) return;
				closeNestedMenus(menu);
				menu.open = true;
			});

			menu.addEventListener('mouseleave', () => {
				if (!desktop.matches) return;
				menu.open = false;
			});

			summary?.addEventListener('click', (event) => {
				if (!desktop.matches || event.detail === 0) return;
				event.preventDefault();
			});
		}

		for (const link of header.querySelectorAll('.menu-panel a, .submenu-panel a')) {
			link.addEventListener('click', () => {
				closeNestedMenus();
				closeTopMenus();
			});
		}

		desktop.addEventListener('change', () => {
			closeNestedMenus();
			closeTopMenus();
		});
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initNavigationHover, { once: true });
	} else {
		initNavigationHover();
	}
})();
