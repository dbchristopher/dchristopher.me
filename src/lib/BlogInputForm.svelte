<script lang="ts">
	import { NoteStatus } from '$lib/constants';
	import { toTitleCase } from '$lib/toTitleCase';
	import Button from 'carbon-components-svelte/src/Button/Button.svelte';
	import TextInput from 'carbon-components-svelte/src/TextInput/TextInput.svelte';
	import TextArea from 'carbon-components-svelte/src/TextArea/TextArea.svelte';
  import Select from 'carbon-components-svelte/src/Select/Select.svelte';
	import SelectItem from 'carbon-components-svelte/src/Select/SelectItem.svelte';

	export let handleInsertEntry: (event: Event) => void;
	export let isAsyncPending: boolean;
	export let post: Record<string, any> | undefined = {};

	const statusValues = Object.values(NoteStatus);
</script>

<form on:submit|preventDefault={handleInsertEntry}>
	<fieldset>
		<label for="title">Title</label>
		<TextInput
			type="text"
			id="title"
			name="title"
			placeholder="Title"
			disabled={isAsyncPending}
			value={post?.title || ''}
			required
		/>
	</fieldset>

	<fieldset>
		<label for="content">Content</label>
		<TextArea
			id="content"
			name="content"
			placeholder="Midway upon the journey of our life I found myself within a forest dark, for the straightforward pathway had been lost."
			disabled={isAsyncPending}
			rows={10}
			value={post?.content || ''}
			required
		></TextArea>
	</fieldset>

	<div class="metadata">
		<fieldset>
			<label for="tags">Tags</label>
			<TextInput
				type="text"
				id="tags"
				name="tags"
				placeholder="Tag 1, Tag 2, Tag 3"
				value={post?.tags?.join(', ') || ''}
				disabled={isAsyncPending}
				required
			/>
		</fieldset>

		<fieldset>
			<label for="status">Status</label>
			<Select selected={post?.status} id="status" name="status" disabled={isAsyncPending} required>
				{#each statusValues as status}
					<SelectItem value={status}>{toTitleCase(status)}</SelectItem>
				{/each}
			</Select>
		</fieldset>
	</div>

	<Button type="submit" disabled={isAsyncPending}>Submit</Button>
</form>

<style>
	form {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
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
	.metadata {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
</style>
