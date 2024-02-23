<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ post } = data);
</script>

<section>
	<h1>{post?.title}</h1>
	<ul>
		{#each post?.tags as tag}
			<li>{tag}</li>
		{/each}
	</ul>

	<p>{post?.content}</p>
</section>
