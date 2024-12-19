<script lang="ts">
	import type { PageData } from './$types';
	import { NoteStatus } from '$lib/constants';
	import { format } from 'date-fns';
	import { title } from '$lib/store.js';
	import ContentWrapper from '$lib/ContentWrapper.svelte';
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { blogEntries, status, error, isUserAuthenticated } = $derived(data);

	title.set('Notes');
</script>

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
		<section>
			<md-list class="blog-entries">
				{#each blogEntries as post}
					{#if post.status === NoteStatus.PUBLISHED || isUserAuthenticated}
						<md-list-item type="link" href="notes/{post.slug}">
							<div slot="supporting-text">
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
