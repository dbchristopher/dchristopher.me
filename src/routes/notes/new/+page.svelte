<script lang="ts">
	import type { PageData } from './$types';
	import BlogInputForm from '$lib/BlogInputForm.svelte';
	import { insertEntry } from './utils/insertEntry';

	export let data: PageData;
	$: ({ isUserAuthenticated } = data);
	let isAsyncPending: boolean = false;

	const handleInsertEntry = async (event: Event) => {
		if (isAsyncPending === false && isUserAuthenticated) {
			isAsyncPending = true;
			await insertEntry(event);
			isAsyncPending = false;
		}
	};
</script>

{#if isUserAuthenticated}
	<!-- create a new form api endpoint for writing a new post -->
	<BlogInputForm {isAsyncPending} {handleInsertEntry} />
{:else}
	<a href="/notes/auth">Sign in to continue</a>
{/if}
