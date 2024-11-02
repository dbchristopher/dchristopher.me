<script lang="ts">
	import { preventDefault } from 'svelte/legacy';

	import { NoteStatus } from '$lib/constants';
	import { toTitleCase } from '$lib/toTitleCase';
	import Button from 'carbon-components-svelte/src/Button/Button.svelte';
	import TextInput from 'carbon-components-svelte/src/TextInput/TextInput.svelte';
	import TextArea from 'carbon-components-svelte/src/TextArea/TextArea.svelte';
	import Select from 'carbon-components-svelte/src/Select/Select.svelte';
	import SelectItem from 'carbon-components-svelte/src/Select/SelectItem.svelte';
	import Close from 'carbon-icons-svelte/lib/Close.svelte';

	interface Props {
		handleInsertEntry: (event: Event) => void;
		handleDelete?: ((event: Event) => void) | undefined;
		handleCancelClick?: (() => void) | undefined;
		isAsyncPending: boolean;
		post?: Record<string, any> | undefined;
	}

	let {
		handleInsertEntry,
		handleDelete = undefined,
		handleCancelClick = undefined,
		isAsyncPending,
		post = {}
	}: Props = $props();

	const statusValues = Object.values(NoteStatus);
</script>

<form onsubmit={preventDefault(handleInsertEntry)}>
	<fieldset>
		{#if post?.slug}
			<input type="hidden" value={post.slug} name="slug" />
		{/if}
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

	<div class="form-action-grid">
		<Button type="submit" disabled={isAsyncPending}>Submit</Button>
		{#if handleDelete !== undefined}
			<div class="divider"></div>
			<Button on:click={handleDelete} kind="ghost" class="button--delete"
				><Close size={20} />Delete Post</Button
			>
			<div></div>
			<Button kind="ghost" on:click={handleCancelClick}>Cancel</Button>
		{/if}
	</div>
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

	.form-action-grid {
		display: grid;
		grid-template-columns: auto auto auto 1fr auto;
		grid-gap: 1rem;
		align-items: center;
	}

	.form-action-grid .divider {
		width: 1px;
		background: #ccc;
		height: 1rem;
	}
	:global(.button--delete) {
		color: rgb(180, 25, 25);
	}
</style>
