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
				<h1>Bookshelf</h1>
			</header>
		</div>
		<p>
			Reading is a habit I'd like to continue and to grow. To aid in my own education and to better
			remember the things I've read, this is a running list of books that I've finished and some
			short thoughts about them.
		</p>
		<section class="stats">
			<dl>
				<dt>Books finished since August 2024:</dt>
				<dd>{blogEntries.length}</dd>
			</dl>
		</section>
		<PostEntryList {blogEntries} isUserAuthenticated={!!isUserAuthenticated} />
	</article>
</ContentWrapper>

<style>
	h1 {
		margin-bottom: 0;
	}
	section {
		margin-top: 1rem;
	}
	.list-header {
		display: grid;
		align-items: center;
		grid-template-columns: 1fr auto;
	}
</style>
