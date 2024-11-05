<script lang="ts">
	import { preventDefault } from 'svelte/legacy';
	interface Props {
		handleInsertEntry: (event: Event) => void;
		isAsyncPending: boolean;
		date?: Date;
	}

	let { handleInsertEntry, isAsyncPending, date = new Date() }: Props = $props();
</script>

<form onsubmit={preventDefault(handleInsertEntry)}>
	<fieldset>
		<md-outlined-text-field
			label="amount"
			placeholder="50"
			type="number"
			id="amount"
			name="amount"
			required
			min="0"
			max="100"
			disabled={isAsyncPending}
			size="xl"
		></md-outlined-text-field>
	</fieldset>
	<fieldset>
		<md-outlined-text-field
			label="Description"
			placeholder="boiled chicken"
			type="text"
			id="description"
			name="description"
			required
			disabled={isAsyncPending}
			size="xl"
		></md-outlined-text-field>
	</fieldset>
	<input type="hidden" name="date" value={date.toISOString()} />
	<md-filled-button type="submit" disabled={isAsyncPending}>Submit</md-filled-button>
</form>

<style>
	form {
		display: grid;
		grid-template-columns: 1fr 3fr auto;
		grid-gap: 0.5rem;
		align-items: middle;
		background: white;
	}

	fieldset {
		border: none;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr;
	}
</style>
