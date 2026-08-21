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
						<option value="portrait-layout">Default portrait layout</option>
						<option value="portrait-layout-feature">Feature portrait layout</option>
						<option value="portrait-layout-feature-dark">Feature dark portrait layout</option>
						<option value="portrait-layout-feature-dark-no-dropcap">
							Feature dark portrait layout without drop cap
						</option>
						<option value="portrait-layout-feature-pride">Feature pride portrait layout</option>
						<option value="portrait-layout-opinion">Opinion portrait layout</option>
						<option value="portrait-layout-obituary">Obituary portrait layout</option>
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
