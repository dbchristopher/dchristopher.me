<script lang="ts">
	import '@fontsource/fira-sans'; // Defaults to weight 400
	import '@fontsource/fira-sans/400.css'; // Specify weight
	import '@fontsource/fira-sans/700.css'; // Specify weight
	import '@fontsource/fira-sans/400-italic.css'; // Specify
	import '@fontsource/fira-sans/700-italic.css'; // Specify
	import '../reset.css';
	import '../app.css';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ isUserAuthenticated } = data);
</script>

<h1>Daniel Christopher</h1>

<h2>Senior Frontend Software Engineer</h2>

<nav>
	<a href="/">Home</a>
	<a href="/notes">Notes</a>
	<a href="/about">About</a>
	<a href="/contact">Contact</a>
	<a href="/protein">Protein</a>
	{#if isUserAuthenticated}
		<a href="/notes/auth-destroy">Sign Out</a>
	{/if}
	{#if !isUserAuthenticated}
		<a href="/notes/auth">Sign in</a>
	{/if}
</nav>

<slot />
