<script lang="ts">
	import type { PageData } from './$types';

	async function authenticate(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		await fetch('/api/auth', {
			method: 'POST',
			body: data
		});
	}

	export let data: PageData;

	$: ({ isUserAuthenticated } = data);

	// todo: redirect to /notes/new if isUserAuthenticated
</script>

<p>{isUserAuthenticated}</p>

<form on:submit|preventDefault={authenticate}>
	<input type="email" name="email" class="email-input" />
	<button>Email authentication link</button>
</form>

<style>
	.email-input {
		display: none;
	}
</style>
