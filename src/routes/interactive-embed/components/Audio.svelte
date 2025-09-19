<script>
	import { buildSnippet, copy, stripUndefined } from '../utils';

  const { onBack } = $props();

	let audioControls = $state(true);
	let audioAutoplay = $state(false);
	let audioLoop = $state(false);
	let audioAttribution = $state('');
	let audioMp3 = $state('');
	let audioOgg = $state('');
	let audioTranscript = $state('');

	const audioSources = $derived.by(() => {
		const arr = [];
		if (audioMp3.trim()) arr.push({ mp3: audioMp3.trim() });
		if (audioOgg.trim()) arr.push({ ogg: audioOgg.trim() });
		return arr;
	});

	const audioObj = $derived.by(() =>
		stripUndefined({
			element: 'audio',
			controls: Boolean(audioControls),
			autoplay: audioAutoplay || undefined,
			loop: audioLoop || undefined,
			sources: audioSources,
			attribution: audioAttribution.trim() || undefined,
			transcript: audioTranscript.trim() || undefined
		})
	);

	let outAudio = $derived(buildSnippet(audioObj));
	let msgAudio = $state('');
	function resetAudio() {
		audioControls = true;
		audioAutoplay = false;
		audioLoop = false;
		audioAttribution = '';
		audioMp3 = '';
		audioOgg = '';
		audioTranscript = '';
	}
</script>

<section class="view active" aria-labelledby="audio-heading">
	<div class="panel">
		<div class="title-row">
			<h2 id="audio-heading">Audio builder</h2>
			<button class="back" onclick={() => onBack()}>← Back</button>
		</div>

		<form autocomplete="off">
			<div class="row">
				<div class="field">
					<label class="switch" for="audio-controls">
						<input id="audio-controls" type="checkbox" bind:checked={audioControls} />
						<span>controls</span>
					</label>
				</div>

				<div class="field">
					<label class="switch" for="audio-autoplay">
						<input id="audio-autoplay" type="checkbox" bind:checked={audioAutoplay} />
						<span>autoplay</span>
					</label>
				</div>
			</div>

			<div class="row">
				<div class="field">
					<label class="switch" for="audio-loop">
						<input id="audio-loop" type="checkbox" bind:checked={audioLoop} />
						<span>loop</span>
					</label>
				</div>

				<div class="field">
					<label for="audio-attribution">Attribution (optional)</label>
					<input
						id="audio-attribution"
						type="text"
						placeholder="Recorded by Baker Consultants Ltd"
						bind:value={audioAttribution}
					/>
				</div>
			</div>

			<div class="row">
				<div class="field">
					<label for="audio-mp3">MP3 source</label>
					<input
						id="audio-mp3"
						type="url"
						placeholder="https://example.com/audio.mp3"
						bind:value={audioMp3}
					/>
				</div>

				<div class="field">
					<label for="audio-ogg">OGG source (optional)</label>
					<input
						id="audio-ogg"
						type="url"
						placeholder="https://example.com/audio.ogg"
						bind:value={audioOgg}
					/>
				</div>
			</div>

			<div class="row">
				<div class="field">
					<label for="audio-transcript">Transcript URL (optional)</label>
					<input
						id="audio-transcript"
						type="url"
						placeholder="https://example.com/transcripts/audio.html"
						bind:value={audioTranscript}
					/>
				</div>
			</div>
		</form>

		<div class="out">
			<div class="actions">
				<button class="btn" onclick={() => copy(outAudio, (m) => (msgAudio = m))}
					>Copy to clipboard</button
				>
				<button class="btn secondary" onclick={resetAudio}>Reset</button>
			</div>
			<textarea class="snippet" readonly bind:value={outAudio}></textarea>
			<p class="hint" role="status" aria-live="polite">{msgAudio}</p>
		</div>
	</div>
</section>
