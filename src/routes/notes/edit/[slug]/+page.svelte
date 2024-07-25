<script lang="ts">
	import type { PageData } from './$types';
	import Button from "carbon-components-svelte/src/Button/Button.svelte";
	import BlogInputForm from '$lib/BlogInputForm.svelte';
	import {destroyEntry} from './utils/destroyEntry'
	// import {updateEntry} from './utils/updateEntry'

	export let data: PageData;

	$: ({ post, isUserAuthenticated } = data);

	let isAsyncPending: boolean = false;

	const handleInsertEntry = async (event: Event) => {
		if (isAsyncPending === false && isUserAuthenticated) {
			isAsyncPending = true;
			console.log('updating entry', event);
			// await updateEntry(event);
			isAsyncPending = false;
		}
	};

	const handleDelete = async () => {
		const response = confirm('Are you sure? This cannot be undone.');
		if (response && post?._id) {
			isAsyncPending = true;
			await destroyEntry(post._id);
			isAsyncPending = false;
		} else {
			console.log('save');
		}
	};
</script>

<article>
	{#if isUserAuthenticated}
		<BlogInputForm {handleInsertEntry} isAsyncPending={false} {post} />
		<br /><br />
		<Button on:click={handleDelete}>Delete Post</Button>
	{:else}
		<a href="/notes/auth">Sign in to continue</a>
	{/if}
</article>
