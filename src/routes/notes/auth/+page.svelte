<script lang="ts">
	import { run, preventDefault } from 'svelte/legacy';

	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { title } from '$lib/store';

	title.set('Sign In');
	async function authenticate(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		try {
			const response = await fetch('/api/auth', {
				method: 'POST',
				body: data
			});

			if (!response.ok) {
				throw new Error('Authentication failed');
			}

			// Handle response here if necessary
		} catch (error) {
			console.error('Error during authentication:', error);
		}
	}

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	run(() => {
		if (browser && data.isUserAuthenticated) {
			// check if on client side
			// Redirect to new post page if user is authenticated
			goto('/notes/new');
		}
	});
</script>

<div class="page-grid">
	<form onsubmit={preventDefault(authenticate)}>
		<input type="email" name="email" class="email-input" />
		<md-filled-button type="submit">Email authentication link</md-filled-button>
	</form>
</div>

<style>
	.page-grid {
		padding: 2rem 0;
		text-align: center;
	}
	.email-input {
		display: none;
	}
</style>
