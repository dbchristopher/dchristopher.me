<script lang="ts">
	import CloudUpload from 'carbon-icons-svelte/lib/CloudUpload.svelte';
	interface Props {
		handleInsertEntry: (event: Event) => void;
		isAsyncPending: boolean;
		date?: Date;
	}
	let { handleInsertEntry, isAsyncPending, date = new Date() }: Props = $props();
	const handleFormKeypress = (e) => {
		if (e.key === 'Enter' && !isAsyncPending) {
			e.target.closest('form').requestSubmit();
		}
	};
</script>

<form onsubmit={handleInsertEntry}>
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
			onkeypress={handleFormKeypress}
			role="textbox"
			tabindex="0"
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
			onkeypress={handleFormKeypress}
			role="textbox"
			tabindex="0"
		></md-outlined-text-field>
	</fieldset>
	<input type="hidden" name="date" value={date.toISOString()} />
	<md-filled-icon-button type="submit" disabled={isAsyncPending}
		><md-icon><CloudUpload size={24} /></md-icon></md-filled-icon-button
	>
</form>

<style>
	form {
		display: grid;
		grid-template-columns: 2fr 5fr auto;
		grid-gap: 0.5rem;
		align-items: center;
		background: white;
	}

	fieldset {
		border: none;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr;
	}
</style>
