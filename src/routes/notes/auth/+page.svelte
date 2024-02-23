<script lang="ts">
	async function authenticate(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		await fetch('/api/auth', {
			method: 'POST',
			body: data
		});
	}
</script>

<form on:submit|preventDefault={authenticate}>
	<input type="email" name="email" class="email-input" />
	<button>Email authentication link</button>
</form>

<style>
	.email-input {
		display: none;
	}
</style>
