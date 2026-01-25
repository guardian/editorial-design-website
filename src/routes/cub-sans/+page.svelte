<script>
	import '../../lib/styles/cub-sans.scss';
	import guardianLogo from '../../lib/assets/guardian-design-logo.svg';
	import docTitlesVideo from '../../lib/assets/guardian-cub-sans/doc-titles.mp4';
	import docCreditsVideo from '../../lib/assets/guardian-cub-sans/doc-credits.mp4';
	import docNamesVideo from '../../lib/assets/guardian-cub-sans/doc-names.mp4';
	import docPosterImage from '../../lib/assets/guardian-cub-sans/doc-poster.jpg';

	import { onMount } from 'svelte';

	let scrollContainer;
	let sectionRefs = Array(8).fill(null);
	let activeIndex = 0;
	let currentYear = new Date().getFullYear();
	let isBlackBgActive = false;
	let fontSizeMin = 24;
	let fontSizeMax = 300;
	let fontSizeUnit = 'px';

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

	function changeCharSet(setName) {
		selectedCharSet = setName;
		currentChars = characterSets[setName];
	}

	const scrollToSection = (idx) => {
		const el = sectionRefs[idx];
		if (el && scrollContainer) {
			scrollContainer.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
		}
	};

	onMount(() => {
		const detachResponsiveDefaults = applyResponsiveEditorDefaults();

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
		};
	});
</script>

<main class="snap-container" bind:this={scrollContainer}>
	<!-- Section 1: Intro -->
	<section class="snap-section intro black-bg" bind:this={sectionRefs[0]}>
		<div class="wrapper copy-wrapper intro-wrapper">
			<h1>THE BLACK PANTHER Cubs</h1>
			<p>A new display typeface from the Guardian</p>
		</div>
	</section>
	<!-- Section 5: Copy -->
	<section class="snap-section copy black-bg" bind:this={sectionRefs[1]}>
		<div class="wrapper copy-wrapper">
			<h2>The inspiration</h2>
			<p>
				Guardian Cub Sans was born out of an editorial project exploring the lives of THE BLACK
				PANTHER Cubs - the children born into THE BLACK PANTHER party.
			</p>
			<p>
				THE BLACK PANTHER newspaper, designed by Emory Douglas uses type to emphasise the urgency
				around the movement. 50 years later the Cubs speak of a continued fight for justice. Cub
				Sans is designed with a sharp social and historical sensibility, this font channels the
				boldness and urgency of revolutionary print media in a modern world.
			</p>
		</div>
	</section>

	<!-- CAROUSEL SECTION -->
	<section class="snap-section carousel black-bg" bind:this={sectionRefs[2]}>
		<div class="wrapper carousel-wrapper">
			<div class="carousel-scroll-container">
				{#each currentChars as char}
					<div class="char-display">{char}</div>
				{/each}
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
			</div>
		</div>
	</section>

	<!-- Section 5: Copy -->
	<section class="snap-section copy" bind:this={sectionRefs[3]}>
		<div class="wrapper copy-wrapper">
			<h2>The process</h2>
			<p>
				Guardian Cub Sans was born out of an editorial project exploring the lives of THE BLACK
				PANTHER Cubs - the children born into THE BLACK PANTHER party.
			</p>
			<p>
				THE BLACK PANTHER newspaper, designed by Emory Douglas uses type to emphasise the urgency
				around the movement. 50 years later the Cubs speak of a continued fight for justice. Cub
				Sans is designed with a sharp social and historical sensibility, this font channels the
				boldness and urgency of revolutionary print media in a modern world.
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
				<video src={docTitlesVideo} autoplay muted loop playsinline poster={docPosterImage}></video>
			</div>
		</div>
	</section>

	<!-- Section 7: Video (Lower thirds) -->
	<section class="snap-section video black-bg" bind:this={sectionRefs[6]}>
		<div class="wrapper">
			<p class="caption">Lower Thirds</p>
			<div class="video-wrap">
				<video src={docNamesVideo} autoplay muted loop playsinline poster={docPosterImage}></video>
			</div>
		</div>
	</section>

	<section class="snap-section links black-bg" bind:this={sectionRefs[7]}>
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
