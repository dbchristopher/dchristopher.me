<script lang="ts">
	import type { PageData } from "./$types";

  export let data: PageData;

  $: ({blogEntries} = data)
</script>

<h1>Notes</h1>

<section>
  <ul>
    {#each blogEntries as post}
      <li><a href="notes/{post.slug}">{post.title}</a></li>
    {/each}
  </ul>
</section>

