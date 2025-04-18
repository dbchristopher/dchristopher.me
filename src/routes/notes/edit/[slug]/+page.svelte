<script lang="ts">
	import type { PageData } from './$types';
	import BlogInputForm from '$lib/BlogInputForm.svelte';
	import { destroyEntry } from './utils/destroyEntry';
	import { goto } from '$app/navigation';
	import { updateEntry } from './utils/updateEntry';
	import ContentWrapper from '$lib/ContentWrapper.svelte';
	import ImageUploader from '$lib/ImageUploader.svelte';

	import SEO from '$lib/SEO.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { post, isUserAuthenticated, metadata } = $derived(data);

	let isAsyncPending: boolean = false;

	const handleInsertEntry = async (event: Event) => {
		if (isAsyncPending === false && isUserAuthenticated) {
			isAsyncPending = true;
			if (post) {
				await updateEntry(post._id, event);
			}
			isAsyncPending = false;
			goto(`/notes/${post?.slug}`);
		}
	};

	const handleDelete = async () => {
		const response = confirm('Are you sure? This cannot be undone.');
		if (response && post?._id) {
			isAsyncPending = true;
			await destroyEntry(post._id);
			isAsyncPending = false;
			goto('/notes');
		} else {
			console.log('save');
		}
	};

	const handleCancelClick = () => {
		goto('/notes/' + post?.slug);
	};
</script>

<SEO {metadata} />

<article>
	{#if isUserAuthenticated}
		<ContentWrapper>
			<BlogInputForm
				{handleInsertEntry}
				{handleDelete}
				{handleCancelClick}
				isAsyncPending={false}
				{post}
			/>
			<ImageUploader />
		</ContentWrapper>
	{:else}
		<a href="/notes/auth">Sign in to continue</a>
	{/if}
</article>
