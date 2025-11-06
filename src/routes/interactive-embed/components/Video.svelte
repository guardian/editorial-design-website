<script>
	import { buildSnippet, stripUndefined, copy } from '../utils';
	const { onBack } = $props();

	let videoPoster = $state('');
	let videoType = $state('header');
	// 'show-all' | 'hide-sound' | 'hide-all'
	let videoControlsMode = $state('show-all');
	let videoAutoplay = $state(false);
	// 'infinite' | 'three' | 'none'
	let videoLoopMode = $state('none');
	let videoMp4 = $state('');
	let videoWebm = $state('');
	let videoVtt = $state('');
	let videoTranscript = $state('');
	let videoAttribution = $state('');

	let videoAdvanced = $state(false);
	let vdMobMp4 = $state('');
	let vdMobWebm = $state('');
	let vdDeskMp4 = $state('');
	let vdDeskWebm = $state('');

	const videoMp4Label = $derived(videoMp4 && videoWebm ? 'MP4 (fallback)' : 'MP4');
	const videoWebmLabel = $derived(
		videoWebm ? (videoMp4 ? 'WebM' : 'WebM (optional)') : 'WebM (optional)'
	);

	$effect(() => {
		if (videoAdvanced) {
			if (videoMp4) {
				if (!vdMobMp4) vdMobMp4 = videoMp4;
				if (!vdDeskMp4) vdDeskMp4 = videoMp4;
			}
			if (videoWebm) {
				if (!vdMobWebm) vdMobWebm = videoWebm;
				if (!vdDeskWebm) vdDeskWebm = videoWebm;
			}
		}
	});

	$effect(() => {
		if (videoType === 'header') {
			videoAutoplay = true;
		}
	});

	const videoSources = $derived.by(() => {
		const s = {};
		if (videoMp4.trim()) s.mp4 = videoMp4.trim();
		if (videoWebm.trim()) s.webm = videoWebm.trim();

		if (videoAdvanced) {
			const responsive = {},
				mobile = {},
				desktop = {};
			const mMp4 = (vdMobMp4 || videoMp4).trim(),
				mWm = (vdMobWebm || videoWebm).trim();
			if (mMp4) mobile.mp4 = mMp4;
			if (mWm) mobile.webm = mWm;
			const dMp4 = (vdDeskMp4 || videoMp4).trim(),
				dWm = (vdDeskWebm || videoWebm).trim();
			if (dMp4) desktop.mp4 = dMp4;
			if (dWm) desktop.webm = dWm;
			if (Object.keys(mobile).length) responsive.mobile = mobile;
			if (Object.keys(desktop).length) responsive.desktop = desktop;
			if (Object.keys(responsive).length) s.responsive = responsive;
		}
		return s;
	});

	const videoObj = $derived.by(() =>
		stripUndefined({
			element: 'video',
			poster: videoPoster.trim() || undefined,
			controls: videoControlsMode !== 'hide-all',
			hideSoundButton: videoControlsMode === 'hide-sound' ? true : undefined,
			videoType,
			sources: Object.keys(videoSources).length ? videoSources : undefined,
			autoplay: videoAutoplay || undefined,
			loop: videoLoopMode === 'infinite' ? true : undefined,
			loopCount: videoLoopMode === 'three' ? 3 : undefined,
			vtt: videoVtt.trim() || undefined,
			transcript: videoTranscript.trim() || undefined,
			attribution: videoAttribution.trim() || undefined
		})
	);

	let outVideo = $derived(buildSnippet(videoObj));
	let msgVideo = $state('');

	function resetVideo() {
		videoPoster = '';
		videoType = 'header';
		videoControlsMode = 'show-all';
		videoAutoplay = false;
		videoLoopMode = 'none';
		videoMp4 = '';
		videoWebm = '';
		videoVtt = '';
		videoTranscript = '';
		videoAttribution = '';
		videoAdvanced = false;
		vdMobMp4 = '';
		vdMobWebm = '';
		vdDeskMp4 = '';
		vdDeskWebm = '';
	}
</script>

<section class="view active" aria-labelledby="video-heading">
	<div class="panel">
		<div class="title-row">
			<h2 id="video-heading">Video builder</h2>
			<button class="back" onclick={() => onBack()}>← Back</button>
		</div>

		<form autocomplete="off">
			<div class="row">
				<div class="field">
					<label for="video-poster">Poster URL</label>
					<input
						id="video-poster"
						type="url"
						placeholder="https://example.com/poster.jpg"
						bind:value={videoPoster}
					/>
				</div>

				<div class="field">
					<label for="video-type">Video type</label>
					<select id="video-type" bind:value={videoType}>
						<option value="header">header</option>
						<option value="inline">inline</option>
						<option value="immersive">immersive</option>
					</select>
				</div>
			</div>

			<!-- Controls -->
			<div class="row">
				<div class="field">
					<label for="video-controls">Controls</label>
					<select id="video-controls" bind:value={videoControlsMode}>
						<option value="show-all">Show all controls</option>
						<option value="hide-sound">Hide sound button</option>
						<option value="hide-all">Hide all buttons</option>
					</select>
				</div>

				<div class="field">
					<label class="switch" for="video-autoplay">
						<input
							id="video-autoplay"
							type="checkbox"
							bind:checked={videoAutoplay}
							disabled={videoType === 'header'}
						/>
						<span>
							autoplay {videoType === 'header' ? '(forced on for header)' : ''}
						</span>
					</label>
				</div>

				<div class="field">
					<label for="video-loop">Looping</label>
					<select id="video-loop" bind:value={videoLoopMode}>
						<option value="infinite">Loop continuously</option>
						<option value="three">Loop 3 times</option>
						<option value="none">Do not loop</option>
					</select>
				</div>
			</div>

			<!-- Simple sources -->
			<div class="row">
				<div class="field">
					<label for="video-mp4">{videoMp4Label}</label>
					<input
						id="video-mp4"
						type="url"
						placeholder="https://example.com/video.h264.mp4"
						bind:value={videoMp4}
					/>
				</div>

				<div class="field">
					<label for="video-webm">{videoWebmLabel}</label>
					<input
						id="video-webm"
						type="url"
						placeholder="https://example.com/video.av1.webm"
						bind:value={videoWebm}
					/>
				</div>
			</div>

			<!-- Tracks / metadata -->
			<div class="row">
				<div class="field">
					<label for="video-vtt">Captions VTT (optional)</label>
					<input
						id="video-vtt"
						type="url"
						placeholder="https://example.com/tracks/en.vtt"
						bind:value={videoVtt}
					/>
				</div>

				<div class="field">
					<label for="video-transcript">Transcript URL (optional)</label>
					<input
						id="video-transcript"
						type="url"
						placeholder="https://example.com/transcripts/story.html"
						bind:value={videoTranscript}
					/>
				</div>
			</div>

			<div class="row">
				<div class="field">
					<label for="video-attribution">Attribution (optional)</label>
					<input
						id="video-attribution"
						type="text"
						placeholder="The sound of earthworms in soil. Credit: Baker Consultants Ltd"
						bind:value={videoAttribution}
					/>
				</div>

				<div class="field">
					<label class="switch" for="video-advanced">
						<input id="video-advanced" type="checkbox" bind:checked={videoAdvanced} />
						<span>Enable advanced sources (mobile / desktop)</span>
					</label>
				</div>
			</div>

			<!-- Advanced -->
			{#if videoAdvanced}
				<div id="video-advanced-block">
					<div class="row">
						<div class="field">
							<label for="vd-mob-mp4">Mobile — MP4</label>
							<input
								id="vd-mob-mp4"
								type="url"
								placeholder="/video/mobile.h264.mp4"
								bind:value={vdMobMp4}
							/>
						</div>
						<div class="field">
							<label for="vd-mob-webm">Mobile — WebM (optional)</label>
							<input
								id="vd-mob-webm"
								type="url"
								placeholder="/video/mobile.av1.webm"
								bind:value={vdMobWebm}
							/>
						</div>
					</div>

					<div class="row">
						<div class="field">
							<label for="vd-desk-mp4">Desktop — MP4</label>
							<input
								id="vd-desk-mp4"
								type="url"
								placeholder="/video/desktop.h264.mp4"
								bind:value={vdDeskMp4}
							/>
						</div>
						<div class="field">
							<label for="vd-desk-webm">Desktop — WebM (optional)</label>
							<input
								id="vd-desk-webm"
								type="url"
								placeholder="/video/desktop.av1.webm"
								bind:value={vdDeskWebm}
							/>
						</div>
					</div>

					<p class="hint">Leave a field blank to inherit the main MP4/WebM above.</p>
				</div>
			{/if}
		</form>

		<div class="out">
			<div class="actions">
				<button class="btn" onclick={() => copy(outVideo, (m) => (msgVideo = m))}
					>Copy to clipboard</button
				>
				<button class="btn secondary" onclick={resetVideo}>Reset</button>
			</div>
			<textarea class="snippet" readonly bind:value={outVideo}></textarea>
			<p class="hint" role="status" aria-live="polite">{msgVideo}</p>
			<p class="hint">
				The 'header' video type is <strong>not lazy loaded</strong> and will autoplay unless a user
				has 'prefers-reduced-motion setting'.<br />The 'inline' and 'immersive' videos are lazy
				loaded. All videos will show controls if over 5 seconds for accessibility. <br />
				If you supply both MP4 and WebM, the MP4 will be treated as a <strong>fallback</strong>.<br
				/>
				If you add <strong>mobile/desktop</strong> sources, they will be used <em>instead of</em> the
				main MP4/WebM URLs.
			</p>
		</div>
	</div>
</section>
