<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ blogEntries, status, error } = data);
</script>

<h1>Notes</h1>

{#if status === 'error' && error}
  <p>{error.message}</p>
{/if}

<section>
	<ul>
		{#each blogEntries as post}
			<li><a href="notes/{post.slug}">{post.title}</a></li>
		{/each}
	</ul>
</section>

<a href="/notes/new">New Post</a>
