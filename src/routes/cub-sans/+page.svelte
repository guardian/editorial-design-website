<script>
	import '../../lib/styles/cub-sans.scss';
	import { Swiper } from 'swiper';
	import { Pagination, Navigation } from 'swiper/modules';
	import 'swiper/css';
	import 'swiper/css/pagination';
	import 'swiper/css/navigation';
	import { fade } from 'svelte/transition';

	// Import assets
	import guardianLogo from '../../lib/assets/guardian-design-logo.svg';
	import docTitlesVideo from '../../lib/assets/guardian-cub-sans/doc-titles.mp4';
	import docCreditsVideo from '../../lib/assets/guardian-cub-sans/doc-credits.mp4';
	import docNamesVideo from '../../lib/assets/guardian-cub-sans/doc-names.mp4';
	import docPosterImage from '../../lib/assets/guardian-cub-sans/doc-poster.jpg';

	import { onMount } from 'svelte';

	let fontSize = 140;
	let lineHeight = 140;
	let letterSpacing = 0;
	let text = 'Power to the people. Vex kings, jump barricades, quiz laws, blaze truth, fix world.';

	// Character arrays for different categories
	const characterSets = {
		lowercase: [
			'a',
			'b',
			'c',
			'd',
			'e',
			'f',
			'g',
			'h',
			'i',
			'j',
			'k',
			'l',
			'm',
			'n',
			'o',
			'p',
			'q',
			'r',
			's',
			't',
			'u',
			'v',
			'w',
			'x',
			'y',
			'z'
		],
		uppercase: [
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'X',
			'Y',
			'Z'
		],
		numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		glyphs: [
			'!',
			'@',
			'#',
			'$',
			'%',
			'^',
			'&',
			'*',
			'(',
			')',
			'-',
			'_',
			'=',
			'+',
			'[',
			']',
			'{',
			'}',
			'|',
			'\\',
			';',
			':',
			'"',
			"'",
			',',
			'.',
			'<',
			'>',
			'/',
			'?'
		]
	};

	// Current selected character set
	let selectedSet = 'lowercase';
	let currentCharacters = characterSets[selectedSet];

	// Function to change character set
	function changeCharacterSet(setName) {
		selectedSet = setName;
		currentCharacters = characterSets[setName];
	}

	onMount(() => {
		const swiper = new Swiper('.mySwiper', {
			modules: [Navigation],
			slidesPerView: 1,
			spaceBetween: 30,
			centeredSlides: true,

			navigation: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		});
	});
</script>

<main class="cub-sans">
	<section class="cub-sans-header">
		<h1>
			<span>Guardian Cub Sans</span> A new condensed typeface inspired by the Black Panther Newspaper
		</h1>
	</section>
	<section class="cub-sans-decription">
		<p>
			Guardian Cub Sans was born out of an editorial project exploring the lives of THE BLACK
			PANTHER Cubs - the children born into THE BLACK PANTHER party.
		</p>
		<p>
			THE BLACK PANTHER newspaper, designed by Emory Douglas uses type to emphasise the urgency
			around the movement. 50 years later the Cubs speak of a continued fight for justice. Cub Sans
			is designed with a sharp social and historical sensibility, this font channels the boldness
			and urgency of revolutionary print media in a modern world.
		</p>
		<a
			target="_blank"
			href="https://www.theguardian.com/us-news/ng-interactive/2025/mar/25/when-the-revolution-doesnt-come-documentary"
			>Watch the film</a
		>
		<a
			target="_blank"
			href="https://www.theguardian.com/world/ng-interactive/2025/mar/25/what-happens-when-the-us-declares-war-on-your-parents-the-black-panther-cubs-know"
			>Read the article</a
		>
	</section>

	<section class="cub-sans-swiper">
		<div class="swiper mySwiper">
			<div class="swiper-wrapper">
				{#each currentCharacters as character, index (character)}
					<div class="swiper-slide" in:fade={{ delay: index * 50, duration: 300 }}>
						{character}
					</div>
				{/each}
			</div>
			<div class="swiper-button-next"></div>
			<div class="swiper-button-prev"></div>
			<div class="button-wrapper">
				<button
					class="lowercase"
					class:active={selectedSet === 'lowercase'}
					on:click={() => changeCharacterSet('lowercase')}
				>
					Lowercase
				</button>
				<button
					class="uppercase"
					class:active={selectedSet === 'uppercase'}
					on:click={() => changeCharacterSet('uppercase')}
				>
					Uppercase
				</button>
				<button
					class="numbers"
					class:active={selectedSet === 'numbers'}
					on:click={() => changeCharacterSet('numbers')}
				>
					Numbers
				</button>
				<button
					class="glyphs"
					class:active={selectedSet === 'glyphs'}
					on:click={() => changeCharacterSet('glyphs')}
				>
					Glyphs
				</button>
			</div>
		</div>
	</section>

	<section class="cub-sans-details">
		<div class="cub-sans-details-item">
			<span>Hh</span>
			<label for="Hh">Tall x-height improves legibility at smaller sizes</label>
		</div>
		<div class="cub-sans-details-item">
			<span>BIG</span>
			<label for="BIG"
				>Condensed width allows the most impact on both it’s smallest and largest mediums</label
			>
		</div>
		<div class="cub-sans-details-item">
			<span>ag</span>
			<label for="ag"
				>While it is geometric, it's not sterile. Subtle curves and irregularities give it a
				slightly handmade or analog feel, referencing hand cut type</label
			>
		</div>
	</section>

	<section class="cub-sans-creative">
		<div>
			<video src={docTitlesVideo} autoplay muted poster={docPosterImage}>
				Your browser does not support the video tag.
			</video>
			<p>Documentary Titles</p>
		</div>
		<div>
			<video src={docCreditsVideo} autoplay muted poster={docPosterImage}>
				Your browser does not support the video tag.
			</video>
			<p>Documentary Credits</p>
		</div>

		<div>
			<video src={docNamesVideo} autoplay muted poster={docPosterImage}>
				Your browser does not support the video tag.
			</video>
			<p>Lower thirds</p>
		</div>
		<img src={docPosterImage} alt="" />
	</section>
	<section class="cub-sans-explore">
		<div class="wrapper">
			<div
				class="editor"
				contenteditable="true"
				bind:innerText={text}
				style="--font-size: {fontSize}px; --line-height: {lineHeight}px; --letter-spacing: {letterSpacing}px;"
			></div>
			<div class="controls">
				<div class="controls-item">
					<input id="fontSize" type="range" min="16" max="300" step="1" bind:value={fontSize} />
					<label for="fontSize">Size: {fontSize}px</label>
				</div>
				<div class="controls-item">
					<input id="lineHeight" type="range" min="16" max="300" step="1" bind:value={lineHeight} />
					<label for="lineHeight">Line Height: {lineHeight}px</label>
				</div>
				<div class="controls-item">
					<input
						id="letterSpacing"
						type="range"
						min="-10"
						max="10"
						step="0.5"
						bind:value={letterSpacing}
					/>
					<label for="letterSpacing">Letter spacing: {letterSpacing}px</label>
				</div>
			</div>
		</div>
	</section>
	<section class="cub-sans-footer">
		<img src={guardianLogo} alt="Guardian Design logo" />
		<p>© 2025 Guardian News & Media Limited or its affiliated companies. All rights reserved.</p>
	</section>
</main>
