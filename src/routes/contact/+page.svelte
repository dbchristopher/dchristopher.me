<script lang="ts">
	let emailSent = false;
	$: emailSent;

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

<h1>Contact</h1>
<h2>Say Hello!</h2>

{#if !emailSent}
	<p>Send me something cool.</p>
	<form name="contact" method="POST" on:submit|preventDefault={sendMail}>
		<fieldset class="usercode">
			<label for="usercode">Enter a random value</label>
			<input id="usercode" name="usercode" tabindex="-1" value="" autocomplete="off" />
		</fieldset>

		<fieldset>
			<label for="email">Your Email:</label><input id="email" type="email" name="email" required />
		</fieldset>
		<fieldset>
			<label for="message">Message:</label>
			<textarea id="message" name="message" rows="10"></textarea>
		</fieldset>
		<p>
			<button type="submit">Send</button>
		</p>
	</form>
{:else}
	<p>Message received!</p>
{/if}

<style>
	fieldset {
		border: none;
		display: grid;
		grid-template-columns: 1fr;
	}
	.usercode {
		display: none;
	}
</style>
