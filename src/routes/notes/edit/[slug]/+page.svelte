<script lang="ts">
	import type { PageData } from './$types';
	import { format } from 'date-fns';
	import { NoteStatus } from '$lib/constants';
	import BlogInputForm from '$lib/BlogInputForm.svelte';

	export let data: PageData;

	$: ({ post, isUserAuthenticated } = data);

	let isAsyncPending: boolean = false;

	const handleInsertEntry = (event: Event) => {
		if (isAsyncPending === false && isUserAuthenticated) {
			isAsyncPending = true;
			console.log('updating entry', event);
			// await updateEntry(event);
			isAsyncPending = false;
		}
	};
</script>

<article>
	{#if isUserAuthenticated}
		<BlogInputForm {handleInsertEntry} isAsyncPending={false} {post} />
	{:else}
		<a href="/notes/auth">Sign in to continue</a>
	{/if}
	<textarea>{post?.content}</textarea>
</article>
