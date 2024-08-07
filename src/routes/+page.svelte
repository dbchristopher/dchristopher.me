<script lang="ts">
	import type { PageData } from './$types';
	import { title } from '$lib/store';
	import { marked } from 'marked';
	import { format } from 'date-fns';

	title.set('Home');

	export let data: PageData;

	$: ({ blogEntries, isUserAuthenticated } = data);

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
		const paragraphs = content.split('\n');
		const sentences = splitIntoSentences(paragraphs[0]);

		return sentences.slice(0, 3).join(' ');
	}
</script>

<h1>Thinking for a Living</h1>
<h2>Exploring Tech, Wellness, and Life's Adventures</h2>
<p>
	I'm a software developer who brings ideas to life through code, a fitness enthusiast always
	striving for personal growth, a writer exploring diverse topics, and a dedicated parent. This is
	my little corner of the internet, which showcases my professional work and personal interests.
</p>
<section>
	<h2>Recent Notes</h2>
	<ul>
		{#each blogEntries as post}
			{#if post.status === 'published' || isUserAuthenticated}
				<li>
					<a href="notes/{post.slug}">{post.title}</a>
					<time pubdate="pubdate" datetime={post.created}
						>Posted on {format(new Date(post.created), 'E LLL do, yyyy')}</time
					>
					{@html marked.parse(extractContentSnippet(post.content))}
				</li>
			{/if}
		{/each}
	</ul>
</section>
