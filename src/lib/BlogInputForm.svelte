<script lang="ts">
	import { onMount } from 'svelte';
	import { NoteStatus, IMAGE_LIST_DELIMITER } from '$lib/constants';
	import { toTitleCase } from '$lib/toTitleCase';
	import Close from 'carbon-icons-svelte/lib/Close.svelte';
	import ImageUploader from '$lib/ImageUploader.svelte';
	import CopyToClipboard from './CopyToClipboard.svelte';
	import { PUBLIC_CLOUDINARY_CLOUD_NAME } from '$env/static/public';
	import { updateFormState, setDefaultFormState } from '$lib/stores/formState';

	const optimizeCloudinaryUrl = (cloudinaryId: string) => {
		// Store the optimized URL with transformations
		return `https://res.cloudinary.com/${PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${cloudinaryId}`;
	};

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
		post = { title: '' }
	}: Props = $props();

	const headerImageId = $derived(post.header_image_id);
	const cloudinaryImageIds = $derived(post.cloudinary_image_ids || []);
	const draftImages = $state<string[]>([]);
	const fullImageLibrary = $derived([...cloudinaryImageIds, ...draftImages]);
	const imageUrlCSV = $derived(fullImageLibrary.join(IMAGE_LIST_DELIMITER));

	const handleImageUpload = (cloudinaryId: string) => {
		draftImages.push(cloudinaryId);
	};

	const statusValues = Object.values(NoteStatus);

	/**
	 * Set up "unsaved content warning" by setting default form state and tracking changes from there
	 */
	type FormInputKeys = 'title' | 'content' | 'images' | 'seo_description' | 'tags' | 'status';

	onMount(() => {
		setDefaultFormState<FormInputKeys>({
			title: post.title,
			content: post.content,
			images: imageUrlCSV,
			seo_description: post.seo_description,
			tags: post.tags,
			status: post.status
		});
	});

	const handleFormStateUpdate = (key: FormInputKeys) => (e: Event) => {
		updateFormState([key, (e.target as HTMLInputElement).value]);
	};

	$effect(() => {
		handleFormStateUpdate('images')({ target: { value: imageUrlCSV } });
	});
</script>

<form onsubmit={handleInsertEntry}>
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
			oninput={handleFormStateUpdate('title')}
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
			oninput={handleFormStateUpdate('content')}
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
				oninput={handleFormStateUpdate('seo_description')}
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
				oninput={handleFormStateUpdate('tags')}
				required
			></md-outlined-text-field>
		</fieldset>

		<fieldset>
			<md-outlined-select
				label="Status"
				value={post?.status}
				id="status"
				name="status"
				disabled={isAsyncPending}
				onchange={handleFormStateUpdate('status')}
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
		<md-outlined-button kind="ghost" onclick={handleCancelClick}>Cancel</md-outlined-button>
		{#if handleDelete !== undefined}
			<div class="delete-container">
				<md-text-button
					role="button"
					tabindex="0"
					onclick={handleDelete}
					onkeypress={(e: KeyboardEvent) => {
						if (e.key === 'Enter') {
							handleDelete(e);
						}
					}}
					kind="ghost"
					class="button--delete"><Close size={20} slot="icon" />Delete</md-text-button
				>
			</div>
		{/if}
	</div>
	<fieldset>
		<legend>Post Image Library</legend>
		<ImageUploader {handleImageUpload} />
		<input type="hidden" name="image_id_list" value={imageUrlCSV} />
		<div class="image-library">
			{#each fullImageLibrary as imageId}
				<section class="preview">
					<div class="image-actions">
						<CopyToClipboard value={optimizeCloudinaryUrl(imageId)} />
						<div>
							<input
								type="radio"
								value={imageId}
								name="header_image_id"
								id={`header-image-${imageId}`}
								checked={imageId === headerImageId}
							/>
							<label for={`header-image-${imageId}`}>Post Header</label>
						</div>
					</div>
					<img src={optimizeCloudinaryUrl(imageId)} />
				</section>
			{/each}
		</div>
	</fieldset>
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
		grid-template-columns: auto auto 1fr;
		grid-gap: 1rem;
		align-items: center;
	}

	.delete-container {
		justify-self: end;
	}

	.preview {
	}

	.image-actions {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		padding: 0.5rem 0;
		gap: 1rem;
	}
	.preview img {
		max-width: 100%;
		max-height: 300px;
	}

	:global(.button--delete) {
		color: rgb(180, 25, 25);
	}
	.image-library {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
	}
</style>
