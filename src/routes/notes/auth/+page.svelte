<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

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

	export let data: PageData;

	$: if (browser && data.isUserAuthenticated) {
		// check if on client side
		// Redirect to new post page if user is authenticated
		goto('/notes/new');
	}
</script>

<p>{data.isUserAuthenticated}</p>

<form on:submit|preventDefault={authenticate}>
	<input type="email" name="email" class="email-input" />
	<button>Email authentication link</button>
</form>

<style>
	.email-input {
		display: none;
	}
</style>
