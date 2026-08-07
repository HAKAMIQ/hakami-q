(() => {
	const media = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');

	const init = () => {
		const header = document.querySelector('[data-site-header]');
		if (!(header instanceof HTMLElement) || header.dataset.persistentNavInitialized === 'true') return;

		const nav = header.querySelector('.main-nav');
		if (!(nav instanceof HTMLElement)) return;

		header.dataset.persistentNavInitialized = 'true';

		const placeholder = document.createElement('span');
		placeholder.className = 'nav-sticky-placeholder';
		placeholder.setAttribute('aria-hidden', 'true');
		nav.before(placeholder);

		let anchorY = 0;
		let ticking = false;

		const measure = () => {
			const wasSticky = nav.classList.contains('is-sticky');
			if (wasSticky) nav.classList.remove('is-sticky');
			placeholder.classList.remove('is-active');

			anchorY = placeholder.getBoundingClientRect().top + window.scrollY;
			placeholder.style.setProperty('--hq-nav-sticky-height', `${Math.round(nav.getBoundingClientRect().height)}px`);

			if (wasSticky) update();
		};

		const update = () => {
			if (!media.matches) {
				nav.classList.remove('is-sticky');
				placeholder.classList.remove('is-active');
				return;
			}

			const shouldStick = window.scrollY > anchorY;
			nav.classList.toggle('is-sticky', shouldStick);
			placeholder.classList.toggle('is-active', shouldStick);
		};

		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			window.requestAnimationFrame(() => {
				update();
				ticking = false;
			});
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', measure, { passive: true });
		media.addEventListener('change', () => {
			measure();
			update();
		});

		measure();
		update();
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init, { once: true });
	} else {
		init();
	}

	document.addEventListener('astro:page-load', init);
})();
