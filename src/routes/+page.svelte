<script lang="ts">
	import type { PageData } from './$types';
	import { title } from '$lib/store';
	import { marked } from 'marked';
	import { format } from 'date-fns';
	import ContentWrapper from '$lib/ContentWrapper.svelte';

	title.set('Home');

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { blogEntries, isUserAuthenticated } = $derived(data);

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

<ContentWrapper>
	<img src="/images/pfp.jpg" class="pfp" alt="author photo" />
	<section>
		<h2>Recent Posts</h2>
		<ul class="post-list">
			{#each blogEntries as post}
				{#if post.status === 'published' || isUserAuthenticated}
					<li>
						<article>
							<a href="notes/{post.slug}" class="post-title">{post.title}</a>
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
