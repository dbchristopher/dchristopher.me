<script lang="ts">
	import type { PageData } from './$types';
	import ContentWrapper from '$lib/ContentWrapper.svelte';
	import SEO from '$lib/SEO.svelte';
	import PostEntryList from '$lib/PostEntryList.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { blogEntries, status, error, isUserAuthenticated, metadata } = $derived(data);
</script>

<SEO {metadata} />

<ContentWrapper>
	<article>
		{#if status === 'error' && error}
			<p>{error.message}</p>
		{/if}
		<div class="list-header">
			<header>
				<h1>Blog</h1>
			</header>
			<div>
				<md-outlined-button href="/notes/new">New Post</md-outlined-button>
			</div>
		</div>
		<PostEntryList {blogEntries} isUserAuthenticated={!!isUserAuthenticated} />
	</article>
</ContentWrapper>

<style>
	.list-header {
		display: grid;
		align-items: center;
		grid-template-columns: 1fr auto;
	}
</style>
