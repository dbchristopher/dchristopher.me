<script lang="ts">
	import Button from 'carbon-components-svelte/src/Button/Button.svelte';
	import TextInput from 'carbon-components-svelte/src/TextInput/TextInput.svelte';
	export let handleInsertEntry: (event: Event) => void;
	export let isAsyncPending: boolean;
	export let date: Date = new Date();
</script>

<form on:submit|preventDefault={handleInsertEntry}>
	<fieldset>
		<label for="amount">Amount</label>
		<TextInput
			placeholder="50"
			type="number"
			id="amount"
			name="amount"
			required
			min="0"
			max="100"
			disabled={isAsyncPending}
			size="xl"
		/>
	</fieldset>
	<fieldset>
		<label for="description">Description</label>
		<TextInput
			placeholder="boiled chicken"
			type="text"
			id="description"
			name="description"
			required
			disabled={isAsyncPending}
			size="xl"
		/>
	</fieldset>
	<input type="hidden" name="date" value={date.toISOString()} />
	<Button type="submit" disabled={isAsyncPending}>Submit</Button>
</form>

<style>
	form {
		display: grid;
		grid-template-columns: 1fr 3fr auto;
		align-items: end;
		background: white;
	}

	fieldset {
		border: none;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr;
	}
	label {
		text-transform: uppercase;
		font-size: 0.7rem;
	}
</style>
