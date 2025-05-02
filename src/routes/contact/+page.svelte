<script lang="ts">
	import { run, preventDefault } from 'svelte/legacy';

	import ContentWrapper from '$lib/ContentWrapper.svelte';
	import SEO from '$lib/SEO.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let emailSent = $state(false);
	run(() => {
		emailSent;
	});

	async function sendMail(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		try {
			await fetch('/api/contact', {
				method: 'POST',
				body: data
			});

			emailSent = true;
			// Handle response here if necessary
		} catch (error) {
			console.error('Error when sending mail:', error);
		}
	}
</script>

<SEO metadata={data.metadata} />

<ContentWrapper>
	<article>
		<header>
			<h1>Contact</h1>
		</header>

		{#if !emailSent}
			<form name="contact" method="POST" onsubmit={preventDefault(sendMail)}>
				<fieldset class="usercode">
					<label for="usercode">Enter a random value</label>
					<input id="usercode" name="usercode" tabindex="-1" value="" autocomplete="off" />
				</fieldset>

				<fieldset>
					<md-outlined-text-field label="email" id="email" type="email" name="email" required
					></md-outlined-text-field>
				</fieldset>
				<fieldset>
					<md-outlined-text-field
						type="textarea"
						label="Message"
						id="message"
						name="message"
						rows="10"
					></md-outlined-text-field>
				</fieldset>
				<p>
					<md-filled-button type="submit">Send</md-filled-button>
				</p>
			</form>
		{:else}
			<p>Message received!</p>
		{/if}
	</article>
</ContentWrapper>

<style>
	form {
		display: grid;
		grid-gap: 1rem;
	}
	fieldset {
		border: none;
		display: grid;
		grid-template-columns: 1fr;
		padding-left: 0;
		padding-right: 0;
	}
	.usercode {
		display: none;
	}
</style>
