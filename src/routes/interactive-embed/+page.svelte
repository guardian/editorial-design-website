<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import Colour from './components/Colour.svelte';
	import Video from './components/Video.svelte';
	import Audio from './components/Audio.svelte';
	import Dev from './components/Dev.svelte';
	import CultureLists from './components/Culture-lists.svelte';

	// THEME
	let isDark = $state(true);
	const modeText = $derived(isDark ? 'dark' : 'light');

	$effect(() => {
		const root = document.documentElement;
		if (isDark) root.setAttribute('data-theme', 'dark');
		else root.removeAttribute('data-theme');
		try {
			localStorage.setItem('snippet-theme', isDark ? 'dark' : 'light');
		} catch {
			console.warn('Could not toggle light/dark theme');
		}
	});

	// SIMPLE VIEW
	const views = ['home', 'colour', 'video', 'audio', 'dev', 'culture-lists'];
	let view = $state('home');
	let hydrated = false;
	function navigate(id) {
		view = id;
		if (hydrated) {
			goto('#' + id, { replaceState: true, noscroll: true, keepFocus: true });
		}
	}

	onMount(() => {
		hydrated = true;
		try {
			const saved = localStorage.getItem('snippet-theme');
			isDark = saved !== 'light';
		} catch {
			isDark = true;
		}

		const initial = location.hash.slice(1) || 'home';
		view = views.includes(initial) ? initial : 'home';

		const onHash = () => {
			const h = location.hash.slice(1);
			if (views.includes(h)) view = h;
		};
		window.addEventListener('hashchange', onHash);
		return () => window.removeEventListener('hashchange', onHash);
	});
</script>

<!-- HEADER -->
<header>
	<div class="wrap brand">
		<div class="brand-left">
			<div class="dot" aria-hidden="true"></div>
			<div>Interactive Embed Builder</div>
		</div>
		<label class="theme-toggle" title="Toggle theme">
			<span id="mode-label">{modeText}</span>
			<input id="theme-toggle" type="checkbox" bind:checked={isDark} />
		</label>
	</div>
</header>

<!-- MAIN -->
<main class="wrap">
	{#if view === 'home'}
		<section class="view active" aria-labelledby="home-heading">
			<h1 id="home-heading" class="app-title">Choose a template</h1>
			<div class="home-grid">
				<button class="card" onclick={() => navigate('colour')}>
					<span class="pill">template</span>
					<h3>Colour</h3>
					<p>Define a colour token or swatch.</p>
				</button>
				<button class="card" onclick={() => navigate('video')}>
					<span class="pill">template</span>
					<h3>Video</h3>
					<p>Poster, sources, advanced mobile/desktop.</p>
				</button>
				<button class="card" onclick={() => navigate('audio')}>
					<span class="pill">template</span>
					<h3>Audio</h3>
					<p>MP3/OGG sources, autoplay, loop.</p>
				</button>
				<button class="card" onclick={() => navigate('dev')}>
					<span class="pill">advanced</span>
					<h3>&lt;dev&gt;</h3>
					<p>Free-form JSON (bring your own keys).</p>
				</button>
				<button class="card" onclick={() => navigate('culture-lists')}>
					<span class="pill">template</span>
					<h3>Culture Lists</h3>
					<p>Manage and display culture-related lists.</p>
				</button>
			</div>
		</section>
	{:else if view === 'colour'}
		<Colour onBack={() => navigate('home')} />
	{:else if view === 'video'}
		<Video onBack={() => navigate('home')} />
	{:else if view === 'audio'}
		<Audio onBack={() => navigate('home')} />
	{:else if view === 'dev'}
		<Dev onBack={() => navigate('home')} />
	{:else if view === 'culture-lists'}
		<CultureLists onBack={() => navigate('home')} />
	{/if}

	<footer class="hint">
		<p>
			Each builder outputs a single
			<code>&lt;div class="interactive" data-props='…'&gt;</code>
			string using straight quotes &amp; valid JSON. Copy and embed into Composer to create.
		</p>
	</footer>
</main>
