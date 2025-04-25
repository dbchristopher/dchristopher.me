<script lang="ts">
	import type { PageData } from './$types';
	import BlogInputForm from '$lib/BlogInputForm.svelte';
	import { insertEntry } from './utils/insertEntry';
	import ContentWrapper from '$lib/ContentWrapper.svelte';
	import { goto } from '$app/navigation';
	import SEO from '$lib/SEO.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let { isUserAuthenticated, metadata } = $derived(data);
	let isAsyncPending: boolean = $state(false);

	const handleInsertEntry = async (event: Event) => {
		event.preventDefault();
		if (isAsyncPending === false && isUserAuthenticated) {
			isAsyncPending = true;
			const newPostSlug = await insertEntry(event);
			isAsyncPending = false;
			goto(`/notes/${newPostSlug}`);
		}
	};
	``;
</script>

<SEO {metadata} />

<ContentWrapper>
	{#if isUserAuthenticated}
		<!-- create a new form api endpoint for writing a new post -->
		<BlogInputForm {isAsyncPending} {handleInsertEntry} />
	{:else}
		<a href="/notes/auth">Sign in to continue</a>
	{/if}
</ContentWrapper>
