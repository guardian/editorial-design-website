<script>
	import { buildSnippet, copy, stripUndefined } from '../utils';

	const { onBack } = $props();

	const defaultLayout = 'portrait-layout';

	let layout = $state(defaultLayout);

	const portraitAtomObj = $derived.by(() =>
		stripUndefined({
			element: 'portrait-atom',
			layout: layout || undefined
		})
	);

	let outPortraitAtom = $derived(buildSnippet(portraitAtomObj));
	let msgPortraitAtom = $state('');

	const resetPortraitAtom = () => {
		layout = defaultLayout;
	};
</script>

<section class="view active" aria-labelledby="portrait-atom-heading">
	<div class="panel">
		<div class="title-row">
			<h2 id="portrait-atom-heading">Portrait Atom</h2>
			<button class="back" onclick={() => onBack()}>← Back</button>
		</div>

		<form autocomplete="off">
			<div class="row">
				<div class="field">
					<label for="portrait-atom-layout">Layout</label>
					<select id="portrait-atom-layout" bind:value={layout}>
						<option value="portrait-layout">portrait-layout</option>
						<option value="portrait-layout-feature">portrait-layout-feature</option>
						<option value="portrait-layout-feature-dark">portrait-layout-feature-dark</option>
						<option value="portrait-layout-feature-dark-no-dropcap">
							portrait-layout-feature-dark-no-dropcap
						</option>
						<option value="portrait-layout-feature-pride">portrait-layout-feature-pride</option>
						<option value="portrait-layout-opinion">portrait-layout-opinion</option>
						<option value="portrait-layout-obituary">portrait-layout-obituary</option>
					</select>
				</div>
			</div>
		</form>

		<div class="out">
			<div class="actions">
				<button class="btn" onclick={() => copy(outPortraitAtom, (m) => (msgPortraitAtom = m))}
					>Copy to clipboard</button
				>
				<button class="btn secondary" onclick={resetPortraitAtom}>Reset</button>
			</div>
			<textarea class="snippet" readonly bind:value={outPortraitAtom}></textarea>
			<p class="hint" role="status" aria-live="polite">{msgPortraitAtom}</p>
		</div>
	</div>
</section>
