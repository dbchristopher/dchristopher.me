<script lang="ts">
	import { preventDefault } from 'svelte/legacy';
	import { NoteStatus } from '$lib/constants';
	import { toTitleCase } from '$lib/toTitleCase';
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
		<md-outlined-text-field
			label="Title"
			type="text"
			id="title"
			name="title"
			placeholder="Title"
			disabled={isAsyncPending}
			value={post?.title || ''}
			required
		></md-outlined-text-field>
	</fieldset>

	<fieldset>
		<md-outlined-text-field
			label="Content"
			type="textarea"
			id="content"
			name="content"
			placeholder="Midway upon the journey of our life I found myself within a forest dark, for the straightforward pathway had been lost."
			disabled={isAsyncPending}
			rows={10}
			value={post?.content || ''}
			required
		></md-outlined-text-field>
	</fieldset>

	<div class="SEO">
		<fieldset>
			<md-outlined-text-field
				label="SEO Description"
				type="text"
				id="seo_description"
				name="seo_description"
				placeholder="A short post"
				value={post?.seo_description || ''}
				disabled={isAsyncPending}
				required
			></md-outlined-text-field>
		</fieldset>
	</div>

	<div class="metadata">
		<fieldset>
			<md-outlined-text-field
				label="Tags"
				type="text"
				id="tags"
				name="tags"
				placeholder="Tag 1, Tag 2, Tag 3"
				value={post?.tags?.join(', ') || ''}
				disabled={isAsyncPending}
				required
			></md-outlined-text-field>
		</fieldset>

		<fieldset>
			<md-outlined-select
				label="Status"
				selected={post?.status}
				id="status"
				name="status"
				disabled={isAsyncPending}
				required
			>
				{#each statusValues as status}
					<md-select-option value={status}>{toTitleCase(status)}</md-select-option>
				{/each}
			</md-outlined-select>
		</fieldset>
	</div>

	<div class="form-action-grid">
		<md-filled-button type="submit" disabled={isAsyncPending}>Submit</md-filled-button>
		{#if handleDelete !== undefined}
			<div class="divider"></div>
			<md-outlined-button
				role="button"
				tabindex="0"
				onclick={handleDelete}
				onkeypress={(e) => {
					if (e.key === 'Enter') {
						handleDelete(e);
					}
				}}
				kind="ghost"
				class="button--delete"><Close size={20} slot="icon" />Delete Post</md-outlined-button
			>
			<div></div>
			<md-outlined-button kind="ghost" onclick={handleCancelClick}>Cancel</md-outlined-button>
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
