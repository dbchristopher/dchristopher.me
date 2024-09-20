<script lang="ts">
	// White theme
	import 'carbon-components-svelte/css/white.css';
	import '../app.css';
	import type { PageData } from './$types';
	import PageFooter from '$lib/PageFooter.svelte';
	import { page } from '$app/stores';

	import { title } from '$lib/store.js';

	export let data: PageData;

	$: ({ isUserAuthenticated } = data);

	let currentPath = '';

	$: currentPath = $page.url.pathname;
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>
<header>
	<div class="header-content">
		<div class="name"><a href="/">Daniel Christopher</a></div>
	</div>

	<nav>
		<a href="/" class:active={currentPath === '/'}>Home</a>
		<a href="/notes" class:active={currentPath === '/notes'}>Notes</a>
		<a href="/about" class:active={currentPath === '/about'}>About</a>
		<a href="/contact" class:active={currentPath === '/contact'}>Contact</a>
		<a href="/protein" class:active={currentPath === '/protein'}>Protein</a>
		{#if isUserAuthenticated}
			<a href="/notes/auth-destroy">Sign Out</a>
		{/if}
		{#if !isUserAuthenticated}
			<a href="/notes/auth" class:active={currentPath === '/notes/auth'}>Sign in</a>
		{/if}
	</nav>
</header>

<slot />

<PageFooter />

<style>
	nav {
		display: flex;
		gap: 0.6rem;
		padding: 0.5rem 0;
	}

	nav a.active {
		font-weight: bold;
	}

	header {
		padding: 0;
		max-width: 75ch;
		margin: 0 auto 1rem;
		padding: 0.5rem 1rem;
	}

	.header-content {
		font-size: 1rem;
		& a {
			color: inherit;
		}
	}

	.name {
		font-weight: 700;
	}
</style>
