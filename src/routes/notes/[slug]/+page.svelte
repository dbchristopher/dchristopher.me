<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import { format } from 'date-fns';
	import { NoteStatus } from '$lib/constants';
	import { title } from '$lib/store';
	import { pushState } from '$app/navigation';

	export let data: PageData;
	$: ({ post, isUserAuthenticated } = data);

	if (data.post) {
		title.set(data.post.title);
	}
</script>

{#if post}
	<article>
		<header>
			<h1>{post.title}</h1>
			<div class="byline">
				<address class="author">by Daniel Christopher</address>
				<time pubdate="pubdate" datetime={post.created}
					>Posted on {format(new Date(post.created), 'E LLL do, yyyy')}</time
				>
				{#if isUserAuthenticated}
					<a href="/notes/edit/{post.slug}">Edit Post</a>
				{/if}
				{#if post.status === NoteStatus.DRAFT}{post.status}{/if}
				<ul class="tags">
					{#each post.tags as tag, index (tag)}
						<li>{tag}{index < post.tags.length - 1 ? ',' : ''}</li>
					{/each}
				</ul>
			</div>
		</header>
		<div class="content">
			{@html marked.parse(post.content)}
		</div>
	</article>
{/if}

<style>
	article {
		padding: 1rem;
		max-width: 75ch;
		margin: 0 auto;
		font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0;
		font-size: 1.2rem;
	}

	:global(.content p) {
		font: inherit;
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

	article header {
		border-bottom: 1px solid #e0e0e0;
		margin-bottom: 1.5rem;
	}

	article header ul.tags {
		list-style: none;
	}

	article header ul.tags li {
		display: inline-block;
		margin-right: 0.25rem;
		font-style: italic;
	}
</style>
