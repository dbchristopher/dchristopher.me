<script lang="ts">
	import type { PageData } from './$types';
	import BlogInputForm from '$lib/BlogInputForm.svelte';
	import { insertEntry } from './utils/insertEntry';
	import { title, description } from '$lib/store.js';
	import ContentWrapper from '$lib/ContentWrapper.svelte';
	import { goto } from '$app/navigation';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let { isUserAuthenticated } = $derived(data);
	let isAsyncPending: boolean = $state(false);

	const handleInsertEntry = async (event: Event) => {
		if (isAsyncPending === false && isUserAuthenticated) {
			isAsyncPending = true;
			const newPostSlug = await insertEntry(event);
			isAsyncPending = false;
			goto(`/notes/${newPostSlug}`);
		}
	};

	title.set('Write New Note');
	description.clear();
</script>

<ContentWrapper>
	{#if isUserAuthenticated}
		<!-- create a new form api endpoint for writing a new post -->
		<BlogInputForm {isAsyncPending} {handleInsertEntry} />
	{:else}
		<a href="/notes/auth">Sign in to continue</a>
	{/if}
</ContentWrapper>
