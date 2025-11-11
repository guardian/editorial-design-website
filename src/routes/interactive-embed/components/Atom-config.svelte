<script>
	// This component allows to build configuration containers for interactive atoms.
	const { onBack } = $props();
</script>

<section class="view active" aria-labelledby="dev-heading">
	<div class="panel">
		<!-- <div class="title-row">
			<h2 id="dev-heading">Atom Configurator</h2>
			<button class="back" onclick={() => onBack()}>← Back</button>
		</div>

		<form autocomplete="off">
			<div class="row">
				<div class="field">
					<label for="dev-element">Element name</label>
					<input
						id="dev-element"
						type="text"
						placeholder="e.g. 'gallery' or 'quiz'"
						bind:value={devElement}
					/>
				</div>

				<div class="field">
					<label class="switch" for="dev-pretty">
						<input id="dev-pretty" type="checkbox" bind:checked={devPretty} />
						<span>Pretty-print JSON (for readability only)</span>
					</label>
				</div>
			</div>

			<div class="field">
				<label for="dev-json"
					>Custom JSON props (object). Your "element" field will be set from the input above.</label
				>
				<textarea id="dev-json" bind:value={devJsonText}></textarea>
			</div>

			<p class="hint">
				JSON must be valid. Example keys will be merged with
				<code>{'element : your-element'}</code>.<br />
				JSON is <strong>minified</strong> and safely <strong>escaped</strong> for a single-quoted
				<code>data-props</code> attribute.
			</p>
		</form>

		<div class="out">
			<div class="actions">
				<button
					class="btn"
					onclick={() => import('../utils').then(m => m.copy(outDev, (m2)=>msgDev=m2))}
					>Copy to clipboard</button
				>
				<button class="btn secondary" onclick={resetDev}>Reset</button>
			</div>

			<textarea class="snippet" readonly bind:value={outDev}></textarea>
			<p class="hint" role="status" aria-live="polite">{msgDev}</p>
			{#if devErrorMsg}
				<p class="error" aria-live="assertive">{devErrorMsg}</p>
			{/if}
		</div> -->
	</div>
</section>
