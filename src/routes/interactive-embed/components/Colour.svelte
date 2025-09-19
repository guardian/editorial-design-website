<script>
	import {
		buildSnippet,
		copy,
		hexToRgbObj,
		getLuminance,
		contrastRatio,
		wcagBadges
	} from '../utils';

  const { onBack } = $props();

	let colourName = $state('');
	let colourPicker = $state('#ff69b4');
	let colourHex = $state('#ff69b4');
	let includeContrast = $state(false);

	function onColourPickerInput(v) {
		colourPicker = v;
		colourHex = v.toLowerCase();
	}
	function onHexInput(v) {
		colourHex = v;
		if (/^#([0-9a-fA-F]{6})$/.test(v)) colourPicker = v.toLowerCase();
	}

	const colourNameSafe = $derived(colourName.trim() || 'brandPrimary');
	const colourHexSafe = $derived((colourHex.trim() || '#ff69b4').toLowerCase());
	const colourRgbString = $derived.by(() => {
		const { r, g, b } = hexToRgbObj(colourHexSafe);
		return `rgb(${r}, ${g}, ${b})`;
	});
	const suggestedText = $derived(getLuminance(colourHexSafe) > 0.5 ? '#000000' : '#ffffff');
	const contrastVal = $derived(contrastRatio(suggestedText, colourHexSafe));
	const badges = $derived(wcagBadges(contrastVal));

	const colourObj = $derived.by(() => {
		const base = {
			element: 'colour',
			name: colourNameSafe,
			hex: colourHexSafe,
			rgb: colourRgbString
		};
		if (includeContrast) base.suggestedContrastText = suggestedText;
		return base;
	});

	let outColour = $derived(buildSnippet(colourObj));
	let msgColour = $state('');

	function resetColour() {
		colourName = '';
		colourPicker = '#ff69b4';
		colourHex = '#ff69b4';
		includeContrast = false;
	}
</script>

<section class="view active" aria-labelledby="colour-heading">
	<div class="panel">
		<div class="title-row">
			<h2 id="colour-heading">Colour builder</h2>
			<button class="back" onclick={() => onBack()}>← Back</button>
		</div>

		<form autocomplete="off">
			<div class="row">
				<div class="field">
					<label for="colour-name">Name</label>
					<input
						id="colour-name"
						type="text"
						placeholder="e.g. brandPrimary"
						bind:value={colourName}
					/>
				</div>

				<div class="field">
					<label for="colour-value">Value</label>
					<input
						id="colour-value"
						type="color"
						bind:value={colourPicker}
						oninput={(e) => onColourPickerInput(e.currentTarget.value)}
					/>
				</div>
			</div>

			<div class="row">
				<div class="field">
					<label for="colour-hex">Hex (auto)</label>
					<input
						id="colour-hex"
						type="text"
						placeholder="#RRGGBB"
						bind:value={colourHex}
						oninput={(e) => onHexInput(e.currentTarget.value)}
					/>
				</div>

				<div class="field">
					<label class="switch" for="colour-contrast">
						<input id="colour-contrast" type="checkbox" bind:checked={includeContrast} />
						<span>Include suggestedContrastText</span>
					</label>
				</div>
			</div>
		</form>

		<div class="out">
			<div class="actions">
				<button class="btn" onclick={() => copy(outColour, (m) => (msgColour = m))}
					>Copy to clipboard</button
				>
				<button class="btn secondary" onclick={resetColour}>Reset</button>
			</div>

			<textarea class="snippet" readonly bind:value={outColour}></textarea>

			<div class="hint" aria-live="polite">
				Suggested text <code>{suggestedText}</code> vs background
				<code>{colourHexSafe}</code> ({colourRgbString}) → contrast
				<strong>{contrastVal.toFixed(2)}:1</strong>
				<span class="badges">
					<span class="badge {badges.clsSmall}">Small text: {badges.small}</span>
					<span class="badge {badges.clsLarge}">Large text: {badges.large}</span>
				</span>
			</div>

			<p class="hint" role="status" aria-live="polite">{msgColour}</p>
		</div>
	</div>
</section>
