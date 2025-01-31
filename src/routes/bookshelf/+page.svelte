<script lang="ts">
	import type { PageData } from './$types';
	import { NoteStatus } from '$lib/constants';
	import { format } from 'date-fns';
	import { title, description } from '$lib/store.js';
	import ContentWrapper from '$lib/ContentWrapper.svelte';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { blogEntries, status, error, isUserAuthenticated } = $derived(data);

	title.set('Bookshelf');
	description.set('My reading tracker since 2024');
</script>

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
		<section>
			<md-list class="blog-entries">
				{#each blogEntries as post}
					{#if post.status === NoteStatus.PUBLISHED || isUserAuthenticated}
						<md-list-item type="link" href="bookshelf/{post.slug}">
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

	.new-post {
		display: inline-block;
		border: 1px solid var(--ui-grey-1);
		border-radius: 40px;
		text-decoration: none;
		padding: 0.5rem 1rem;
	}
	.list-header {
		display: grid;
		align-items: center;
		grid-template-columns: 1fr auto;
	}
</style>
