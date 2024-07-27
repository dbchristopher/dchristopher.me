<script lang="ts">
	import Button from 'carbon-components-svelte/src/Button/Button.svelte';
	export let handleInsertEntry: (event: Event) => void;
	export let isAsyncPending: boolean;
	export let date: Date = new Date();
</script>

<form on:submit|preventDefault={handleInsertEntry}>
	<fieldset>
		<label for="amount">Amount</label>
		<input
			placeholder="50"
			type="number"
			id="amount"
			name="amount"
			required
			min="0"
			max="100"
			disabled={isAsyncPending}
		/>
	</fieldset>
	<fieldset>
		<label for="description">Description</label>
		<input
			placeholder="boiled chicken"
			type="text"
			id="description"
			name="description"
			required
			disabled={isAsyncPending}
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
		position: sticky;
		bottom: 0;
		left: 0;
		right: 0;
		background: white;
		padding: 0.5rem;
		box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
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
