<script lang="ts">
	// White theme
	import 'carbon-components-svelte/css/white.css';
	import '../app.css';
	import type { PageData } from './$types';

	import { title } from '$lib/store.js';

	export let data: PageData;

	$: ({ isUserAuthenticated } = data);
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>
<header>
	<div class="header-content">
		<a href="/">Daniel Christopher</a>
		<div class="job-title">&middot; Senior Frontend Software Engineer</div>
	</div>

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
</header>

<slot />

<style>
	nav {
		display: flex;
		gap: 0.6rem;
		padding: 0.5rem 0;
	}
	header {
		padding: 1rem;
		margin-bottom: 1rem;
		border-bottom: 1px solid #ddd;
	}

	.header-content {
		font-size: 1.25rem;
		font-weight: 700;
		& a {
			color: inherit;
		}
	}

	.job-title {
		display: inline-block;
	}

	@media (max-width: 768px) {
		.job-title {
			display: none;
		}
	}
</style>
