<script>
	import { onMount } from 'svelte';
	import { ATOM_CONFIG__ATOMS, getAtomProps, getAtomUrl } from '../atom-config';
	import { json } from '@sveltejs/kit';
	import { escapeForSingleQuotedAttr } from '../utils';
	import { get } from 'svelte/store';

	// This component allows to build configuration containers for interactive atoms.
	const { onBack } = $props();

	const atomTypes = ATOM_CONFIG__ATOMS;

	let isPretty = $state(false);
	let selectedAtomType = $state('');
	let selectedAtomUrl = $derived(selectedAtomType ? getAtomUrl(selectedAtomType) : '');
	let copiedMsg = $state('');
	let errorMsg = $state('');
	let inputValues = $state([]);

	let selectedAtomProps = $derived.by(() => {
		return getAtomProps(selectedAtomType);
	});

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
		selectedAtomProps.forEach((prop) => {
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
		if (selectedAtomType && selectedAtomProps) {
			initInputValues();
		}
	});

	const setJsonAttrs = () => {
		if (selectedAtomProps) {
			const atomProps = $state.snapshot(selectedAtomProps);
			const obj = {};
			atomProps.forEach((prop, index) => {
				obj[prop.name] = inputValues[index];
			});
			jsonAttrs = JSON.stringify(obj, null, isPretty ? 2 : 0);
		}
	};

	$effect(() => {
		if (inputValues) {
			setJsonAttrs();
		}
	});

	function resetDev() {
		selectedAtomType = '';
		inputValues = [];
		jsonAttrs = '';
		isPretty = false;
		errorMsg = '';
		copiedMsg = '';
	}
</script>

<section class="view active" aria-labelledby="dev-heading">
	<div class="panel">
		<div class="title-row">
			<h2 id="dev-heading">Atom Configurator</h2>
			<button class="back" onclick={() => onBack()}>← Back</button>
		</div>

		<form autocomplete="off">
			<div class="row">
				<div class="field">
					<label for="dev-element">Atom type</label>
					<select
						id="dev-element"
						type="select"
						placeholder="e.g. 'gallery' or 'quiz'"
						bind:value={selectedAtomType}
					>
						{#each atomTypes as atomType}
							<option value={atomType.id}>{atomType.name}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="row">
				{#if selectedAtomType && selectedAtomUrl}
					<p class="hint">
						The atom url for <strong>{selectedAtomType}</strong> is: <em>{selectedAtomUrl}</em>
					</p>
				{/if}
			</div>

			<div class="row">
				{#if selectedAtomType && selectedAtomProps}
					{#each selectedAtomProps as prop, index}
						<div class="field">
							{#if prop.type === 'checkbox'}
								<label class="switch" for={prop.name}>
									<input id={prop.name} type="checkbox" bind:checked={inputValues[index]} />
									<span>{prop.description}</span>
								</label>
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
