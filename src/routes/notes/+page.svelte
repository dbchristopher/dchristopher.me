<script lang="ts">
	import type { PageData } from './$types';
	import { NoteStatus} from '$lib/constants'

	export let data: PageData;

	$: ({ blogEntries, status, error, isUserAuthenticated } = data);
</script>

<h1>Notes</h1>

{#if status === 'error' && error}
	<p>{error.message}</p>
{/if}

<a href="/notes/new">New Post</a>

<section>
	<ul>
		{#each blogEntries as post}
			{#if post.status === NoteStatus.PUBLISHED || isUserAuthenticated}
				<li>
					<a href="notes/{post.slug}">{post.title}</a>
					{#if post.status === NoteStatus.DRAFT}{post.status}{/if}
				</li>
			{/if}
		{/each}
	</ul>
</section>
