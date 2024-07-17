<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import { format } from 'date-fns';
	import { NoteStatus } from '$lib/constants';

	export let data: PageData;

	$: ({ post, isUserAuthenticated } = data);
</script>

<article>
	<header>
		<h1>{post?.title}</h1>
		<div class="byline">
			<address class="author">by Daniel Christopher</address>
			<time pubdate="pubdate" datetime={post?.created}
				>Posted on {format(new Date(post?.created), 'E LLL do, yyyy')}</time
			>
			{#if isUserAuthenticated}
				<a href="/notes/edit/{post?.slug}">Edit Post</a>
			{/if}
			{#if post?.status === NoteStatus.DRAFT}{post.status}{/if}
			<ul>
				{#each post?.tags as tag}
					<li>{tag}</li>
				{/each}
			</ul>
		</div>
	</header>

	<p>{@html marked.parse(post?.content)}</p>
</article>
