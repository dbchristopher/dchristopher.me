<script lang="ts">
	import type { PageData } from './$types';
	import Button from 'carbon-components-svelte/src/Button/Button.svelte';
	import BlogInputForm from '$lib/BlogInputForm.svelte';
	import { destroyEntry } from './utils/destroyEntry';
	import { goto } from '$app/navigation';
	// import {updateEntry} from './utils/updateEntry'
	import { title } from '$lib/store';

	title.set('Edit Note');

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
			goto('/notes');
		} else {
			console.log('save');
		}
	};
</script>

<article>
	{#if isUserAuthenticated}
		<BlogInputForm {handleInsertEntry} {handleDelete} isAsyncPending={false} {post} />
	{:else}
		<a href="/notes/auth">Sign in to continue</a>
	{/if}
</article>
