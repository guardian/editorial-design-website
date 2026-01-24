<script>
	import '../../lib/styles/cub-sans.scss';
	import guardianLogo from '../../lib/assets/guardian-design-logo.svg';
	import docTitlesVideo from '../../lib/assets/guardian-cub-sans/doc-titles.mp4';
	import docCreditsVideo from '../../lib/assets/guardian-cub-sans/doc-credits.mp4';
	import docNamesVideo from '../../lib/assets/guardian-cub-sans/doc-names.mp4';
	import docPosterImage from '../../lib/assets/guardian-cub-sans/doc-poster.jpg';

	import { onMount } from 'svelte';

	let scrollContainer;
	let sectionRefs = Array(10).fill(null);
	let activeIndex = 0;

	// Editable section state (single section)
	let editors = [
		{
			text: 'BLACK POWER. BLACK PRIDE.',
			fontSize: 150,
			lineHeight: 80,
			letterSpacing: 0
		}
	];

	// Carousel state
	const characterSets = {
		lowercase: 'abcdefghijklmnopqrstuvwxyz'.split(''),
		uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
		glyphs: '!@#$%^&*()-_=+[]{}|;:",.<>/?0123456789'.split('')
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
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const idx = sectionRefs.indexOf(entry.target);
						if (idx !== -1) {
							activeIndex = idx;
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
	});
</script>

<main class="snap-container" bind:this={scrollContainer}>
	<!-- Section 1: Intro -->
	<section class="snap-section intro black-bg" bind:this={sectionRefs[0]}>
		<div class="wrapper copy-wrapper intro-wrapper">
			<h1>THE<br />BLACK<br />PANTHER<br />Cubs</h1>
			<p>A new display type from the Guardian</p>
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
	<section class="snap-section carousel" bind:this={sectionRefs[2]}>
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
					lowercase
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

	<!-- Section 2: Video (Titles) -->
	<section class="snap-section video" bind:this={sectionRefs[4]}>
		<div class="wrapper">
			<div class="video-wrap">
				<video src={docTitlesVideo} autoplay muted loop playsinline poster={docPosterImage}></video>
				<p class="caption">Documentary Titles</p>
			</div>
		</div>
	</section>

	<!-- Section 3: Editable -->
	<section class="snap-section editable" bind:this={sectionRefs[5]}>
		<div class="wrapper editable-wrapper">
			<div
				class="editor"
				contenteditable="true"
				bind:innerText={editors[0].text}
				style="--font-size: {editors[0].fontSize}px; --line-height: {editors[0]
					.lineHeight}%; --letter-spacing: {editors[0].letterSpacing}px;"
			></div>

			<div class="controls-bottom">
				<div class="control-item">
					<label for="fontSize-input">SIZE</label>
					<div class="slider-container">
						<input
							id="fontSize-input"
							type="range"
							min="24"
							max="240"
							step="1"
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

	<!-- Section 4: Video (Credits)
	<section class="snap-section video" bind:this={sectionRefs[4]}>
		<div class="video-wrap">
			<video src={docCreditsVideo} autoplay muted loop playsinline poster={docPosterImage}></video>
			<p class="caption">Documentary Credits</p>
		</div>
	</section> -->

	<!-- Section 6: Copy -->
	<section class="snap-section copy" bind:this={sectionRefs[6]}>
		<div class="wrapper">
			<h2>Condensed, loud, legible</h2>
			<p>
				Built for tight columns and bold headlines, Cub Sans balances economy and presence. Its tall
				x-height keeps text readable across sizes.
			</p>
		</div>
	</section>

	<!-- Section 7: Video (Lower thirds) -->
	<section class="snap-section video" bind:this={sectionRefs[7]}>
		<div class="wrapper">
			<div class="video-wrap">
				<video src={docNamesVideo} autoplay muted loop playsinline poster={docPosterImage}></video>
				<p class="caption">Lower Thirds</p>
			</div>
		</div>
	</section>

	<!-- Section 8: Copy -->
	<!-- <section class="snap-section copy" bind:this={sectionRefs[8]}>
		<div class="wrapper">
			<h2>Editorial rhythm</h2>
			<p>
				From display to utility, the face carries a handmade edge — referencing revolutionary print
				culture while serving contemporary storytelling.
			</p>
		</div>
	</section> -->

	<!-- Section 9: Copy -->
	<!-- <section class="snap-section copy" bind:this={sectionRefs[8]}>
		<div class="wrapper">
			<h2>Handmade edge</h2>
			<p>
				A geometric base with human irregularities—echoing protest prints while serving modern
				layouts.
			</p>
		</div>
	</section> -->

	<!-- Section 10: Footer -->
	<section class="snap-section footer" bind:this={sectionRefs[9]}>
		<div class="wrapper">
			<img class="brand" src={guardianLogo} alt="Guardian Design" />
			<p class="copyright">© 2025 Guardian News & Media Limited.</p>
		</div>
	</section>

	<!-- Right-side pagination dots -->
	<nav class="pagination">
		{#each Array(10) as _, i}
			<button
				class:active={activeIndex === i}
				aria-label={`Go to section ${i + 1}`}
				on:click={() => scrollToSection(i)}
			></button>
		{/each}
	</nav>
</main>
