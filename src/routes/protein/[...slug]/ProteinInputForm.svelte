<script lang="ts">
	import CloudUpload from 'carbon-icons-svelte/lib/CloudUpload.svelte';
	interface Props {
		handleInsertEntry: (event: Event) => void;
		date?: Date;
	}
	let { handleInsertEntry, date = new Date() }: Props = $props();
	const handleFormKeypress = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			const target = e.target as HTMLElement;
			target.closest('form')?.requestSubmit();
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
			size="xl"
			onkeypress={handleFormKeypress}
			role="textbox"
			tabindex="0"
		></md-outlined-text-field>
	</fieldset>
	<input type="hidden" name="date" value={date.toISOString()} />
	<md-filled-icon-button type="submit"
		><md-icon><CloudUpload size={24} /></md-icon></md-filled-icon-button
	>
</form>

<style>
	form {
		display: grid;
		grid-template-columns: 2fr 6fr auto;
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
