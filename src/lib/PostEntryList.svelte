<script lang="ts">
	import { NoteStatus } from '$lib/constants';
	import type { Note } from '$lib/types';
	import { format } from 'date-fns';

	interface Props {
		blogEntries: Note[];
		isUserAuthenticated: boolean;
	}

	let { blogEntries, isUserAuthenticated }: Props = $props();
</script>

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

<style>
	.blog-entries {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	section {
		margin-top: 1rem;
	}
</style>
