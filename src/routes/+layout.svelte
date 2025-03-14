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
	<nav>
		<div>
			<a href="/" class="name"><span class="name__first">Daniel</span> Christopher</a>
		</div>
		<ul class="nav-list nav-list--primary">
			<li>
				<a href="/" class:active={currentPath === '/'}>Home</a>
			</li>
			<li>
				<a href="/notes" class:active={currentPath.startsWith('/notes')}>Blog</a>
			</li>
			<li>
				<a href="/bookshelf" class:active={currentPath.startsWith('/bookshelf')}>Bookshelf</a>
			</li>
			<li>
				<a href="/about" class:active={currentPath.startsWith('/about')}>About</a>
			</li>
			<li>
				<a href="/contact" class:active={currentPath.startsWith('/contact')}>Contact</a>
			</li>
			<li></li>
		</ul>
		<ul class="nav-list nav-list--secondary">
			<li>
				<a href="/protein/today" class:active={currentPath.startsWith('/protein')}>Protein</a>
			</li>
			<li>
				{#if isUserAuthenticated}
					<a href="/notes/auth-destroy">Log out</a>
				{:else}
					<a href="/notes/auth">Log in</a>
				{/if}
			</li>
		</ul>
	</nav>
</header>

{@render children?.()}

<PageFooter />

<style>
	nav {
		display: grid;
		grid-template-columns: auto 1fr auto;
	}
	nav a {
		text-decoration: none;
		color: var(--md-sys-color-primary);
		display: inline-block;
		padding: 0.2rem 0.3rem;
		margin-left: -0.2rem;
	}

	nav a:hover {
		text-decoration: underline;
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
		margin: 0 auto 1rem;
		padding: 1.5rem 1rem 0.25rem;
		border-bottom: 1px solid var(--md-sys-color-surface-variant);
		align-items: middle;
	}

	.name {
		font-weight: 700;
		text-decoration: none;
	}

	.name__first {
		font-weight: 300;
	}

	.nav-list {
		list-style: none;
		margin: 0;
		padding: 0;
		white-space: nowrap;
	}

	.nav-list--primary {
		justify-self: center;
		display: grid;
		grid-template-columns: repeat(5, min-content);
		grid-gap: 0.5rem;
	}

	.nav-list--secondary {
		display: grid;
		grid-template-columns: repeat(2, min-content);
		grid-gap: 0.5rem;
	}
</style>
