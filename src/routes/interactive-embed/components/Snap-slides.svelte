<script>
	import { buildSnippet, stripUndefined, copy } from '../utils';
	const { onBack } = $props();

	let theme = $state('feature-light');
  let hasOpacity = $state(false);
	let bgOpacity = $derived.by(() => hasOpacity ? "40%" : "60%");

	const snapSlidesObj = $derived.by(() =>
		stripUndefined({
			element: 'snap-slides',
			theme: theme || undefined,
			bgOpacity: bgOpacity
		})
	);

	let outSnapSlides = $derived(buildSnippet(snapSlidesObj));
	let msgSnapSlides = $state('');

	const resetSnapSlides = () => {
		theme = 'feature-light';
		bgOpacity = '60%';
	};
</script>

<section class="view active" aria-labelledby="colour-heading">
	<div class="panel">
		<div class="title-row">
			<h2 id="snapslides-heading">Snap Slides</h2>
			<button class="back" onclick={() => onBack()}>← Back</button>
		</div>

		<form autocomplete="off">
			<div class="row">
				<div class="field">
					<label for="theme">Theme</label>
					<select id="theme" bind:value={theme}>
						<option value="feature-light">Feature Light</option>
						<option value="feature-dark">Feature Dark</option>
						<option value="news">News</option>
					</select>
				</div>

				<div class="field">
					<label class="switch" for="bg-opacity">
						<input id="bg-opacity" type="checkbox" bind:checked={hasOpacity} />
						<span>Cards have see-through backgrounds</span>
					</label>
				</div>
			</div>
		</form>

		<div class="out">
			<div class="actions">
				<button class="btn" onclick={() => copy(outSnapSlides, (m) => (msgSnapSlides = m))}
					>Copy to clipboard</button
				>
				<button class="btn secondary" onclick={resetSnapSlides}>Reset</button>
			</div>

			<textarea class="snippet" readonly bind:value={outSnapSlides}></textarea>

			<div class="hint" aria-live="polite">
				Without any settings the atom will default to the Feature Light theme, without the Explainer
				tag.
			</div>
		</div>
	</div>
</section>
