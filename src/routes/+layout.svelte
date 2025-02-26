<script lang="ts">
	import '../lib/material';
	// White theme
	import '../app.css';
	import type { PageData } from './$types';
	import PageFooter from '$lib/PageFooter.svelte';
	import { page } from '$app/stores';
	import Logout from 'carbon-icons-svelte/lib/Logout.svelte';

	$effect(() => {
		// set client timezone in a cookie so the backend (protein journal) can read it
		document.cookie = `timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
	});

	interface Props {
		data: PageData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();

	let { isUserAuthenticated } = $derived(data);

	let currentPath = $state('');

	$effect.pre(() => {
		currentPath = $page.url.pathname;
	});
</script>

<header>
	<div class="header-content">
		<div class="name"><a href="/">Daniel Christopher</a></div>
	</div>

	<nav>
		<a href="/" class:active={currentPath === '/'}>Home</a>
		<a href="/notes" class:active={currentPath.startsWith('/notes')}>Blog</a>
		<a href="/bookshelf" class:active={currentPath.startsWith('/bookshelf')}>Bookshelf</a>
		<a href="/about" class:active={currentPath.startsWith('/about')}>About</a>
		<a href="/contact" class:active={currentPath.startsWith('/contact')}>Contact</a>
		<a href="/protein/today" class:active={currentPath.startsWith('/protein')}>Protein</a>
		{#if isUserAuthenticated}
			<a href="/notes/auth-destroy"><Logout /></a>
		{/if}
	</nav>
</header>

{@render children?.()}

<PageFooter />

<style>
	nav {
		display: flex;
		gap: 0.7rem;
		padding: 0.5rem 0;
		align-items: center;
	}

	nav a {
		text-decoration: none;
		color: var(--md-sys-color-primary);
		display: inline-block;
		padding: 0.2rem 0.3rem;
		margin-left: -0.2rem;
	}

	nav a.active {
		font-weight: bold;
		text-decoration: underline;
	}

	@media (max-width: 600px) {
		nav {
			display: block;
		}
	}

	header {
		max-width: 65ch;
		margin: 0 auto 1rem;
		padding: 1.5rem 1rem 0;
	}

	.header-content {
		font-size: 1.5rem;
		& a {
			color: inherit;
		}
	}

	.name {
		font-weight: 700;
	}
</style>
