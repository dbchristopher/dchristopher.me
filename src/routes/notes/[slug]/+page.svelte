<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import { format } from 'date-fns';
	import { NoteStatus } from '$lib/constants';
	import { title } from '$lib/store';
	import ContentWrapper from '$lib/ContentWrapper.svelte';
	import TagGroup from 'carbon-icons-svelte/lib/TagGroup.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let { post, isUserAuthenticated } = $derived(data);

	if (data.post) {
		title.set(data.post.title);
	}
</script>

<ContentWrapper>
	{#if post}
		<article>
			<header>
				<h1>{post.title}</h1>
				<div class="byline">
					<img src="/images/pfp.jpg" class="pfp" alt="author photo" />
					<div class="byline-text">
						<address class="author">by Daniel Christopher</address>
						<time pubdate="pubdate" datetime={post.created}
							>Posted on {format(new Date(post.created), 'E LLL do, yyyy')}</time
						>

						{#if isUserAuthenticated}
							<a href="/notes/edit/{post.slug}">Edit Post</a>
						{/if}
						{#if post.status === NoteStatus.DRAFT}{post.status}{/if}
						<div class="tag-group">
							<TagGroup />
							<ul class="tags">
								{#each post.tags as tag, index (tag)}
									<li>{tag}{index < post.tags.length - 1 ? ',' : ''}</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			</header>
			<div class="content">
				{@html marked.parse(post.content)}
			</div>
		</article>
	{/if}
</ContentWrapper>

<style>
	:global(article) {
		margin: 0 auto;
		font-weight: 400;
		line-height: 1.5;
		letter-spacing: 0;
		font-size: 1.2rem;
	}

	:global(.content p) {
		font: inherit;
		margin-bottom: 1.5rem;
	}
	:global(.content ul) {
		font: inherit;
		padding-bottom: 1.5rem;
		list-style-type: disc;
		list-style-position: inside;
		padding-left: 1.5rem;
	}

	:global(.content li) {
		padding-bottom: 0.5rem;
	}

	address {
		font-style: normal;
	}

	h1 {
		margin: 0;
	}

	.tag-group {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
	}
	article header {
		border-bottom: 1px solid #e0e0e0;
		margin-bottom: 1rem;
	}
	article header ul.tags {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	article header ul.tags li {
		display: inline-block;
		margin-right: 0.25rem;
		font-style: italic;
	}

	.byline {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-gap: 1rem;
		font-size: 0.8rem;
		padding: 0.5rem 0;
	}
	.byline .pfp {
		width: 50px;
		border-radius: 100%;
	}
</style>
