<script>
	import { buildSnippet, stripUndefined, copy } from '../utils';
	const { onBack } = $props();

	let theme = $state('feature-light');

	const snapSlidesObj = $derived.by(() =>
		stripUndefined({
			element: 'snap-slides',
			theme: theme || undefined,
		})
	);

	let outSnapSlides = $derived(buildSnippet(snapSlidesObj));
	let msgSnapSlides = $state('');

	const resetSnapSlides = () => {
		theme = 'feature-light';
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

      <p class="hint" role="status" aria-live="polite">{msgSnapSlides}</p>
		</div>
	</div>
</section>
