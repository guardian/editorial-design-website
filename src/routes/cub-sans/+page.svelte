<script>
	import '../../lib/styles/cub-sans.scss';
	import guardianLogo from '../../lib/assets/guardian-design-logo.svg';
	import docTitlesVideo from '../../lib/assets/guardian-cub-sans/doc-titles.mp4';
	import docTitlesPoster from '../../lib/assets/guardian-cub-sans/doc-titles-poster.jpg';
	import docCreditsVideo from '../../lib/assets/guardian-cub-sans/doc-credits.mp4';
	import docCreditsPoster from '../../lib/assets/guardian-cub-sans/doc-credits-poster.jpg';
	import docNamesVideo from '../../lib/assets/guardian-cub-sans/doc-names.mp4';
	import docNamesPoster from '../../lib/assets/guardian-cub-sans/doc-names-poster.jpg';
	import desktopDocPosterImage from '../../lib/assets/guardian-cub-sans/Poster-mock-up-16-9-LOW.jpg';
	import mobileDocPosterImage from '../../lib/assets/guardian-cub-sans/Poster-mock-up-9-16.jpg';

	import { onMount, tick } from 'svelte';

	let scrollContainer;
	let sectionRefs = Array(8).fill(null);
	let activeIndex = 0;
	let currentYear = new Date().getFullYear();
	let isBlackBgActive = false;
	let fontSizeMin = 24;
	let fontSizeMax = 300;
	let fontSizeUnit = 'px';
	let carouselContainer;
	let showLoader = true;

	function lazyVideo(node) {
		const src = node.getAttribute('data-src');
		if (!src) return;

		const load = () => {
			node.src = src;
			node.removeAttribute('data-src');
			node.load();
			const playPromise = node.play?.();
			if (playPromise && typeof playPromise.catch === 'function') {
				playPromise.catch(() => {});
			}
		};

		let observer;
		if (typeof IntersectionObserver !== 'undefined') {
			observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							load();
							observer.disconnect();
							break;
						}
					}
				},
				{ root: scrollContainer || null, threshold: 0.2 }
			);
			observer.observe(node);
		} else {
			load();
		}

		return {
			destroy() {
				observer?.disconnect();
			}
		};
	}

	// Editable section state (single section)
	let editors = [
		{
			text: 'BLACK POWER. BLACK PRIDE.',
			fontSize: 150,
			lineHeight: 80,
			letterSpacing: 0
		}
	];

	function applyResponsiveEditorDefaults() {
		const setSize = () => {
			const width = window.innerWidth;
			let size = 150;
			let min = 24;
			let max = 300;
			let unit = 'px';

			const toVw = (px) => Number(((px / width) * 100).toFixed(2));

			if (width >= 1300) {
				size = toVw(360);
				min = toVw(80);
				max = toVw(700);
				unit = 'vw';
			} else if (width >= 980) {
				size = toVw(320);
				min = toVw(50);
				max = toVw(520);
				unit = 'vw';
			} else if (width >= 740) {
				size = 250;
				min = 40;
				max = 420;
			}
			fontSizeMin = min;
			fontSizeMax = max;
			fontSizeUnit = unit;
			editors = [{ ...editors[0], fontSize: size }];
		};

		setSize();
		window.addEventListener('resize', setSize);

		return () => {
			window.removeEventListener('resize', setSize);
		};
	}

	const characterSets = {
		lowercase: 'abcdefghijklmnopqrstuvwxyz'.split(''),
		uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
		glyphs: '0123456789!@#$%^&*-_=+()[]{}|;:",./?'.split('')
	};

	let selectedCharSet = 'lowercase';
	let currentChars = characterSets[selectedCharSet];
	const CAROUSEL_STEP = 3;

	let charRefs = [];
	let currentCharIndex = 0;

	function syncCharRefs() {
		charRefs = carouselContainer
			? Array.from(carouselContainer.querySelectorAll('.char-display'))
			: [];
	}

	async function waitForFonts() {
		if (typeof document === 'undefined' || !document.fonts) {
			showLoader = false;
			return;
		}

		try {
			await Promise.race([document.fonts.load('1em "Guardian Cubs Sans"'), document.fonts.ready]);
		} catch (err) {
			// Ignore font load errors; let the timeout hide the loader.
		} finally {
			showLoader = false;
		}
	}

	async function changeCharSet(setName) {
		selectedCharSet = setName;
		currentChars = characterSets[setName];
		await tick();
		syncCharRefs();
		resetCarousel();
	}

	function resetCarousel() {
		currentCharIndex = 0;
		if (carouselContainer) {
			carouselContainer.scrollTo({ left: 0, behavior: 'auto' });
		}
	}

	function scrollToIndex(index) {
		if (!carouselContainer || !charRefs.length) return;
		const targetIndex = Math.min(Math.max(0, index), charRefs.length - 1);
		const target = charRefs[targetIndex];
		if (!target) return;
		currentCharIndex = targetIndex;
		carouselContainer.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
	}

	function scrollByChars(delta) {
		scrollToIndex(currentCharIndex + delta);
	}

	function handleCarouselScroll() {
		if (!carouselContainer || !charRefs.length) return;
		const { scrollLeft } = carouselContainer;
		let closestIndex = 0;
		let closestDistance = Number.POSITIVE_INFINITY;
		for (let i = 0; i < charRefs.length; i += 1) {
			const ref = charRefs[i];
			if (!ref) continue;
			const distance = Math.abs(ref.offsetLeft - scrollLeft);
			if (distance < closestDistance) {
				closestDistance = distance;
				closestIndex = i;
			}
		}
		currentCharIndex = closestIndex;
	}

	const scrollToSection = (idx) => {
		const el = sectionRefs[idx];
		if (el && scrollContainer) {
			scrollContainer.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
		}
	};

	onMount(() => {
		const detachResponsiveDefaults = applyResponsiveEditorDefaults();
		tick().then(syncCharRefs);

		const loaderTimeout = setTimeout(() => {
			showLoader = false;
		}, 6000);

		waitForFonts().finally(() => clearTimeout(loaderTimeout));

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const idx = sectionRefs.indexOf(entry.target);
						if (idx !== -1) {
							activeIndex = idx;
							isBlackBgActive = entry.target.classList.contains('black-bg');
						}
					}
				}
			},
			{
				root: scrollContainer,
				threshold: 0.6
			}
		);

		sectionRefs.forEach((el) => el && observer.observe(el));

		return () => {
			observer.disconnect();
			detachResponsiveDefaults();
			clearTimeout(loaderTimeout);
		};
	});
</script>

<div class="loading-overlay" class:loaded={!showLoader} aria-hidden={!showLoader}>
	<div class="spinner" role="status" aria-label="Loading font"></div>
</div>

<main class="snap-container" bind:this={scrollContainer}>
	<!-- Section 1: Intro -->
	<section class="snap-section intro black-bg" bind:this={sectionRefs[0]}>
		<div class="wrapper copy-wrapper intro-wrapper">
			<h1>THE BLACK PANTHER Cubs</h1>
			<p>The Guardian Cub Sans<br />A new display typeface from the Guardian</p>
		</div>
	</section>
	<!-- Section 5: Copy -->
	<section class="snap-section copy black-bg" bind:this={sectionRefs[1]}>
		<div class="wrapper copy-wrapper">
			<h2>The inspiration</h2>
			<p>
				This typeface is about inheritance, not preservation. It draws from the Black Panther
				newspaper — a publication made under pressure, urgent and incomplete by necessity. Rather
				than seeing these as a finished system, we treated them as something to be continued. The
				move to expand the missing lowercase family became a guiding metaphor: parent to child,
				Panther to Cub, learning language through what already exists. The aim was not to revive the
				past, but to carry its voice forward.
			</p>
		</div>
	</section>

	<!-- CAROUSEL SECTION -->
	<section class="snap-section carousel black-bg" bind:this={sectionRefs[2]}>
		<div class="wrapper carousel-wrapper">
			<div
				class="carousel-scroll-container"
				bind:this={carouselContainer}
				on:scroll={handleCarouselScroll}
			>
				{#each currentChars as char, i}
					<div class="char-display" bind:this={charRefs[i]}>{char}</div>
				{/each}

				<!-- <div class="lines">
					<hr class="cap-height" />
					<hr class="x-height" />
					<hr class="baseline" />
					<hr class="descender" />
				</div> -->
			</div>

			<div class="carousel-controls">
				<button
					class:active={selectedCharSet === 'lowercase'}
					on:click={() => changeCharSet('lowercase')}
				>
					Lowercase
				</button>
				<button
					class:active={selectedCharSet === 'uppercase'}
					on:click={() => changeCharSet('uppercase')}
				>
					UPPERCASE
				</button>
				<button
					class:active={selectedCharSet === 'glyphs'}
					on:click={() => changeCharSet('glyphs')}
				>
					Glyphs
				</button>
				<div class="carousel-nav">
					<button
						class="carousel-arrow left"
						type="button"
						on:click={() => scrollByChars(-CAROUSEL_STEP)}
						aria-label="Scroll left"
					>
						<span aria-hidden="true"
							><svg
								width="27"
								height="24"
								viewBox="0 0 27 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									width="27"
									height="4.56757"
									transform="matrix(-1 0 0 1 27 9.5)"
									fill="white"
								/>
								<path d="M15 0L0 9.50003V14.0676L15 4.56757V0Z" fill="white" />
								<path d="M15 23.5676L0 14.0676V9.50002L15 19.0001V23.5676Z" fill="white" />
							</svg>
						</span>
					</button>
					<button
						class="carousel-arrow right"
						type="button"
						on:click={() => scrollByChars(CAROUSEL_STEP)}
						aria-label="Scroll right"
					>
						<span aria-hidden="true"
							><svg
								width="27"
								height="24"
								viewBox="0 0 27 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect y="9.5" width="27" height="4.56757" fill="white" />
								<path d="M12 0L27 9.50003V14.0676L12 4.56757V0Z" fill="white" />
								<path d="M12 23.5676L27 14.0676V9.50002L12 19.0001V23.5676Z" fill="white" />
							</svg>
						</span>
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- Section 5: Copy -->
	<section class="snap-section copy" bind:this={sectionRefs[3]}>
		<div class="wrapper copy-wrapper">
			<h2>The process</h2>
			<p>
				The original material was fragmentary, likely assembled from letterpress blocks rather than
				a complete typeface. Where letters didn't exist, they were redrawn by hand by designer Harry
				Fischer to extend the set, guided by the logic and irregularities of the originals. The type
				was then digitised and adjusted for contemporary use — scale, spacing, proportions, and
				contrast refined to ensure clarity and usability. These changes weren’t about perfection,
				but continuity: picking up where the newspaper left off and shaping a typeface that could
				speak to a modern audience.
			</p>
		</div>
	</section>

	<!-- Section 3: Editable -->
	<section class="snap-section editable" bind:this={sectionRefs[4]}>
		<div class="wrapper editable-wrapper">
			<div
				class="editor"
				contenteditable="true"
				bind:innerText={editors[0].text}
				style="--font-size: {fontSizeUnit === 'vw'
					? `${editors[0].fontSize}vw`
					: `${editors[0].fontSize}px`}; --line-height: {editors[0]
					.lineHeight}%; --letter-spacing: {editors[0].letterSpacing}px;"
			></div>

			<div class="controls-bottom">
				<div class="control-item">
					<label for="fontSize-input">SIZE</label>
					<div class="slider-container">
						<input
							id="fontSize-input"
							type="range"
							min={fontSizeMin}
							max={fontSizeMax}
							step={fontSizeUnit === 'vw' ? 0.1 : 1}
							bind:value={editors[0].fontSize}
						/>
					</div>
				</div>
				<div class="control-item">
					<label for="lineHeight-input">LEADING</label>
					<div class="slider-container">
						<input
							id="lineHeight-input"
							type="range"
							min="24"
							max="300"
							step="1"
							bind:value={editors[0].lineHeight}
						/>
					</div>
				</div>
				<div class="control-item">
					<label for="letterSpacing-input">SPACING</label>
					<div class="slider-container">
						<input
							id="letterSpacing-input"
							type="range"
							min="-10"
							max="20"
							step="0.5"
							bind:value={editors[0].letterSpacing}
						/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Section 2: Video (Titles) -->
	<section class="snap-section video black-bg" bind:this={sectionRefs[5]}>
		<div class="wrapper">
			<p class="caption">Documentary Titles</p>
			<div class="video-wrap">
				<video
					data-src={docTitlesVideo}
					use:lazyVideo
					autoplay
					muted
					loop
					playsinline
					preload="none"
					poster={docTitlesPoster}
				></video>
			</div>
		</div>
	</section>

	<!-- Section 7: Video (Lower thirds) -->
	<section class="snap-section video black-bg" bind:this={sectionRefs[6]}>
		<div class="wrapper">
			<p class="caption">Lower Thirds</p>
			<div class="video-wrap">
				<video
					data-src={docNamesVideo}
					use:lazyVideo
					autoplay
					muted
					loop
					playsinline
					preload="none"
					poster={docNamesPoster}
				></video>
			</div>
		</div>
	</section>
	<!-- Section 7: Video (Lower thirds) -->
	<section class="snap-section video black-bg" bind:this={sectionRefs[7]}>
		<div class="wrapper">
			<p class="caption">Credits</p>
			<div class="video-wrap">
				<video
					data-src={docCreditsVideo}
					use:lazyVideo
					autoplay
					muted
					loop
					playsinline
					preload="none"
					poster={docCreditsPoster}
				></video>
			</div>
		</div>
	</section>

	<!-- Section 7: Video (Lower thirds) -->
	<section class="snap-section full-screen-image black-bg" bind:this={sectionRefs[8]}>
		<div class="wrapper">
			<p class="caption">Film poster</p>
			<div class="image-wrap">
				<picture>
					<source srcset={desktopDocPosterImage} type="image/jpeg" media="(min-width: 980px)" />
					<source srcset={mobileDocPosterImage} type="image/jpeg" media="(max-width: 979px)" />
					<img
						src={desktopDocPosterImage}
						alt="When the Revolution Doesn't Come: The Black Panther Cubs poster in situ"
						loading="lazy"
					/>
				</picture>
			</div>
		</div>
	</section>

	<section class="snap-section links black-bg" bind:this={sectionRefs[9]}>
		<div class="wrapper">
			<a
				href="https://www.theguardian.com/us-news/ng-interactive/2025/mar/25/when-the-revolution-doesnt-come-documentary"
				target="_blank"
				rel="noopener noreferrer"
				class="link-button"
			>
				WATCH THE FILM
			</a>
			<a
				href="https://www.theguardian.com/world/ng-interactive/2025/mar/25/what-happens-when-the-us-declares-war-on-your-parents-the-black-panther-cubs-know"
				target="_blank"
				rel="noopener noreferrer"
				class="link-button"
			>
				READ THE ARTICLE
			</a>

			<div class="footer black-bg">
				<img class="brand" src={guardianLogo} alt="Guardian Design" />
				<p class="copyright">© {currentYear} Guardian News & Media Limited.</p>
			</div>
		</div>
	</section>

	<!-- Section 10: Footer -->

	<!-- Right-side pagination dots -->
	<nav class="pagination" class:on-black-bg={isBlackBgActive}>
		{#each sectionRefs as _, i}
			<button
				class:active={activeIndex === i}
				aria-label={`Go to section ${i + 1}`}
				on:click={() => scrollToSection(i)}
			></button>
		{/each}
	</nav>
</main>
