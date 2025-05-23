<script lang="ts">
	import '../lib/material';
	// White theme
	import '../app.css';
	import type { PageData } from './$types';
	import PageFooter from '$lib/PageFooter.svelte';
	import { page } from '$app/stores';
	import Menu from 'carbon-icons-svelte/lib/Menu.svelte';
	import { browser } from '$app/environment';
	import { beforeNavigate } from '$app/navigation';
	import { get } from 'svelte/store';
	import isDeepEqual from 'lodash/isEqual';

	import { onMount } from 'svelte';
	import { formState, defaultFormState, resetFormState } from '$lib/stores/formState';

	function formHasUnsavedChanges() {
		const formStateValues = get(formState);
		const defaultFormStateValues = get(defaultFormState);
		const keys = Object.keys(formStateValues);
		const isEqual = keys.every((k) => {
			return isDeepEqual(formStateValues[k], defaultFormStateValues[k]);
		});
		return !isEqual;
	}

	// Handle navigation away from page
	beforeNavigate(({ cancel }) => {
		if (formHasUnsavedChanges()) {
			if (!confirm('You have unsaved changes. Are you sure you want to leave?')) {
				cancel();
			} else {
				resetFormState();
			}
		}
	});

	onMount(() => {
		if (browser) {
			const handleBeforeUnload = (e: Event) => {
				if (formHasUnsavedChanges()) {
					e.preventDefault();
					e.returnValue = '';
					return '';
				}
			};

			window.addEventListener('beforeunload', handleBeforeUnload);

			return () => {
				window.removeEventListener('beforeunload', handleBeforeUnload);
			};
		}
	});

	$effect(() => {
		if (browser) {
			// set client timezone in a cookie so the backend (protein journal) can read it
			document.cookie = `timezone=${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
		}
	});

	interface Props {
		data: PageData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();

	let { isUserAuthenticated } = $derived(data);

	let currentPath = $state('');

	let isMenuOpen = $state(false);

	// Toggle function
	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	$effect.pre(() => {
		currentPath = $page.url.pathname;
	});
</script>

<header>
	<nav>
		<div>
			<a href="/" class="name"><span class="name__first">Daniel</span> Christopher</a>
			<a href="/" class="name name--condensed"><span class="name__first">D</span>C</a>
		</div>
		<ul class="inline-nav-list inline-nav-list--primary">
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
		</ul>
		<ul class="inline-nav-list inline-nav-list--secondary">
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
		<button class="mobile-nav-anchor" class:active={isMenuOpen} onclick={toggleMenu}
			><Menu fill="#5a7373" /></button
		>
	</nav>
</header>

<div class="mobile-nav-content-wrapper" class:open={isMenuOpen}>
	<ul class="mobile-nav-list">
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
</div>

{@render children?.()}

<PageFooter />

<style>
	nav {
		display: grid;
		grid-template-columns: auto 1fr auto;
		grid-gap: 0.5rem;
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
	a.active {
		font-weight: bold;
		text-decoration: underline;
		color: var(--md-sys-color-text);
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
		color: inherit;
	}

	.name--condensed {
		display: none;
	}

	.name__first {
		font-weight: 300;
	}

	.inline-nav-list {
		list-style: none;
		margin: 0;
		padding: 0;
		white-space: nowrap;
		display: grid;
		font-weight: 300;
	}

	.inline-nav-list--primary {
		justify-self: center;
		grid-template-columns: repeat(5, min-content);
		grid-gap: 0.5rem;
	}

	.inline-nav-list--secondary {
		grid-template-columns: repeat(2, min-content);
		grid-gap: 0.5rem;
	}

	.mobile-nav-anchor {
		display: none;
	}

	.mobile-nav-content-wrapper {
		visibility: hidden;
		height: 0;
		overflow: hidden;
		transition: height 0.3s ease;
		background: var(--md-sys-color-surface-variant);
	}

	.mobile-nav-list {
		list-style: none;
		margin: 0;
		padding: 1rem 0;
		display: grid;
		grid-template-columns: auto auto;
		font-weight: 300;
	}

	.mobile-nav-list a {
		padding: 0.25rem 1rem;
		display: block;
		text-decoration: none;
	}

	.mobile-nav-content-wrapper.open {
		height: auto;
	}

	@media (min-width: 550px) and (max-width: 750px) {
		.name {
			display: none;
		}
		.name--condensed {
			display: block;
		}
	}

	@media (max-width: 550px) {
		.name {
			display: block;
			color: var(--md-sys-color-text);
		}
		.name--condensed {
			display: none;
		}

		.inline-nav-list {
			display: none;
		}

		nav {
			grid-template-columns: 1fr auto;
		}

		.mobile-nav-anchor {
			display: inline-block;
			background: transparent;
			border: 1px solid var(--md-sys-color-surface-variant);
			border-radius: 0.2rem;
			transition:
				background-color 0.2s ease,
				top 0.2s ease;
			position: relative;
		}

		.mobile-nav-anchor.active {
			background: var(--md-sys-color-surface-variant);
			top: 0.3rem;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
		.mobile-nav-content-wrapper {
			visibility: visible;
			margin-bottom: 1rem;
		}
		header {
			margin-bottom: 0;
		}
	}
</style>
