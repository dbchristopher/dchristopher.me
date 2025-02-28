<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import SEO from '$lib/SEO.svelte';
	import ContentWrapper from '$lib/ContentWrapper.svelte';

	async function authenticate(event: Event) {
		event.preventDefault();
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

			isSubmitted = true;
			// Handle response here if necessary
		} catch (error) {
			console.error('Error during authentication:', error);
		}
	}

	interface Props {
		data: PageData;
	}

	let isSubmitted = $state(false);

	let { data }: Props = $props();

	$effect(() => {
		if (browser && data.isUserAuthenticated) {
			// check if on client side
			// Redirect to new post page if user is authenticated
			goto('/notes/new');
		}
	});
</script>

<SEO metadata={data.metadata} />

<ContentWrapper>
	{#if isSubmitted}
		<form action="/notes/auth">
			<div class="token-form-grid">
				<md-outlined-text-field
					label="Token"
					placeholder="abc123"
					type="text"
					name="token"
					required
					maxLength="100"
					role="textbox"
					tabindex="0"
				></md-outlined-text-field>
				<div>
					<md-filled-button type="submit" size="xl">Submit</md-filled-button>
				</div>
			</div>
		</form>
	{:else}
		<form onsubmit={authenticate}>
			<input type="email" name="email" class="email-input" />
			<md-filled-button type="submit">Email authentication link</md-filled-button>
		</form>
	{/if}
</ContentWrapper>

<style>
	.token-form-grid {
		display: grid;
		grid-gap: 1rem;
	}
	.email-input {
		display: none;
	}
</style>
