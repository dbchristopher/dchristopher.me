<script lang="ts">
	import type { PageData } from './$types';
	import { NoteStatus } from '$lib/constants';
	import { format } from 'date-fns';
	import ContentWrapper from '$lib/ContentWrapper.svelte';
	import SEO from '$lib/SEO.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { blogEntries, status, error, isUserAuthenticated, metadata } = $derived(data);

	$effect(() => {
		console.log(blogEntries);
	});
</script>

<SEO {metadata} />

<ContentWrapper>
	<article>
		{#if status === 'error' && error}
			<p>{error.message}</p>
		{/if}
		<div class="list-header">
			<header>
				<h1>{metadata?.title}</h1>
			</header>
		</div>
		<section>
			<md-list class="blog-entries">
				{#each blogEntries as post}
					{#if post.status === NoteStatus.PUBLISHED || isUserAuthenticated}
						<md-list-item
							type="link"
							href="/{post.tags.includes('bookshelf') ? 'bookshelf' : 'notes'}/{post.slug}"
						>
							<div slot="supporting-text">
								{#if post.tags.includes('recommended')}<span role="img" aria-label="recommended"
										>⭐</span
									>{/if}
								{format(post.created, 'L/d/yy')}
								{#if post.status === NoteStatus.DRAFT}{post.status}{/if}
							</div>
							<div slot="headline">{post.title}</div>
						</md-list-item>
					{/if}
				{/each}
			</md-list>
		</section>
	</article>
</ContentWrapper>

<style>
	h1 {
		margin-bottom: 0;
	}

	.blog-entries {
		list-style: none;
		padding: 0;
		margin: 0;
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
