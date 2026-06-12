<script>
	import { json } from '@sveltejs/kit';
	import { get } from 'svelte/store';
	import { escapeForSingleQuotedAttr } from '../utils';

	// This component allows to build configuration containers for interactive atoms.
	const { onBack } = $props();

	let atomProps = $state([
		{
			name: 'mainMediaVideoSrc',
			type: 'text',
			value: '',
			description: 'URL for the main media video source'
		},
		{
			name: 'mainMediaVideoPoster',
			type: 'text',
			value: '',
			description: 'URL for the main media video poster image'
		}
	]);

	let isPretty = $state(false);
	let atomName = $state('rich-read');
	let atomUrl = $state(
		'https://content.guardianapis.com/atom/interactive/interactives/2026/04/2026-rich-chapter-read/rich-chapter-read'
	);
	let copiedMsg = $state('');
	let errorMsg = $state('');
	let inputValues = $state([]);
	let jsonAttrs = $state('');
	let jsonText = $derived.by(() => {
		try {
			// Validate JSON
			JSON.parse(jsonAttrs);
			const escaped = escapeForSingleQuotedAttr(jsonAttrs);
			return `<div class="interactive" data-props='${escaped}'></div>`;
		} catch (e) {
			return e.message;
		}
	});

	const initInputValues = () => {
		const arr = [];
		atomProps.forEach((prop) => {
			// Initialize with default values
			if (prop.type === 'checkbox') {
				arr.push(prop.value || false);
			} else {
				arr.push(prop.value || '');
			}
		});
		inputValues = [...arr];
	};

	$effect(() => {
		if (atomName && atomProps) {
			initInputValues();
		}
	});

	const setJsonAttrs = () => {
		if (atomProps) {
			const propsSnap = $state.snapshot(atomProps);
			const obj = {};
			propsSnap.forEach((prop, index) => {
				obj[prop.name] = inputValues[index];
			});
			jsonAttrs = JSON.stringify(obj, null, isPretty ? 2 : 0);
		}
	};

	$effect(() => {
		if (inputValues && atomProps) {
			setJsonAttrs();
		}
	});

	function resetDev() {
		inputValues = [];
		initInputValues();
		jsonAttrs = '';
		isPretty = false;
		errorMsg = '';
		copiedMsg = '';
	}
</script>

<section class="view active" aria-labelledby="dev-heading">
	<div class="panel">
		<div class="title-row">
			<h2 id="dev-heading">Rich Read</h2>
			<button class="back" onclick={() => onBack()}>← Back</button>
		</div>

		<form autocomplete="off">
			<div class="row">
				{#if atomName && atomUrl}
					<p class="hint">
						The atom url for <strong>{atomName}</strong> is: <em>{atomUrl}</em>
					</p>
				{/if}
			</div>

			<div class="row">
				{#if atomProps}
					{#each atomProps as prop, index}
						<div class="field">
							{#if prop.type === 'checkbox'}
								<label class="switch" for={prop.name}>
									<input id={prop.name} type="checkbox" bind:checked={inputValues[index]} />
									<span>{prop.description}</span>
								</label>
							{:else if prop.type === 'text'}
								<label for={prop.name}>{prop.description}</label>
								<input id={prop.name} type="text" bind:value={inputValues[index]} placeholder="https://" />
							{/if}
						</div>
					{/each}
				{/if}
			</div>

			<div class="field">
				<label class="switch" for="dev-pretty">
					<input id="dev-pretty" type="checkbox" bind:checked={isPretty} />
					<span>Pretty-print JSON (for readability only)</span>
				</label>
			</div>
		</form>
		<br />
		<div class="out">
			<div class="actions">
				<button
					class="btn"
					onclick={() => import('../utils').then(m => m.copy(jsonText, (m2)=>copiedMsg=m2))}
					>Copy to clipboard</button
				>
				<button class="btn secondary" onclick={resetDev}>Reset</button>
			</div>

			<textarea class="snippet" readonly bind:value={jsonText}></textarea>
			<p class="hint" role="status" aria-live="polite">{copiedMsg}</p>
			{#if errorMsg}
				<p class="error" aria-live="assertive">{errorMsg}</p>
			{/if}
		</div>
	</div>
</section>
