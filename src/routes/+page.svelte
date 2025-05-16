<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import { format } from 'date-fns';
	import ContentWrapper from '$lib/ContentWrapper.svelte';
	import SEO from '$lib/SEO.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { blogEntries, bookshelfEntries, isUserAuthenticated } = $derived(data);

	function splitIntoSentences(content: string): string[] {
		const sentenceRegex = /(?<=[.!?])\s+(?=[A-Z])/g;
		const linkRegex = /\[([^\]]+)\]\([^\)]+\)/g;

		// Replace markdown links with just their text content
		const plainContent = content.replace(linkRegex, '$1');

		// Split the content into sentences
		const sentences = plainContent.split(sentenceRegex);

		// Trim whitespace from each sentence
		return sentences.map((sentence) => sentence.trim());
	}

	function extractContentSnippet(content: string) {
		if (!content) return '';
		const paragraphs = content.split('\n');
		const sentences = splitIntoSentences(paragraphs[0]);

		return sentences.slice(0, 3).join(' ');
	}
</script>

<SEO metadata={data.metadata} />

<ContentWrapper>
	<section>
		<h2>Recent Blog Posts</h2>
		<ul class="post-list">
			{#each blogEntries as post}
				{#if post.status === 'published' || isUserAuthenticated}
					<li>
						<article>
							<a href="notes/{post.slug}" class="post-title">{post.title}</a>
							<time pubdate="pubdate" datetime={post.created}
								>Posted on {format(new Date(post.created), 'E LLL do, yyyy')}</time
							>
							{@html marked.parse(extractContentSnippet(post.seo_description || post.content))}
						</article>
					</li>
				{/if}
			{/each}
		</ul>
	</section>

	<section>
		<h2>Book Reviews</h2>
		<ul class="post-list">
			{#each bookshelfEntries as post}
				{#if post.status === 'published' || isUserAuthenticated}
					<li>
						<article>
							<a href="bookshelf/{post.slug}" class="post-title">{post.title}</a>
							<time pubdate="pubdate" datetime={post.created}
								>Posted on {format(new Date(post.created), 'E LLL do, yyyy')}</time
							>
							{@html marked.parse(extractContentSnippet(post.content))}
						</article>
					</li>
				{/if}
			{/each}
		</ul>
	</section>
</ContentWrapper>

<style>
	h2 {
		font-size: 1.5rem;
		margin-bottom: 0;
	}

	.pfp {
		max-width: 200px;
		border-radius: 100px;
	}

	.post-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.post-list li {
		margin-bottom: 1rem;
	}

	:global(.post-list p) {
		margin: 0;
		padding: 0;
	}

	.post-list time {
		display: block;
		font-style: italic;
		font-size: 0.85rem;
	}

	.post-title {
		font-weight: bold;
	}
</style>
