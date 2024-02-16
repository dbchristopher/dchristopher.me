<script lang="ts">
	import type { PageData } from "./$types";

  export let data: PageData;

  $: ({blogEntries} = data)
</script>

<h1>Notes</h1>

<section>
  <ul>
    {#each blogEntries as post}
      <li>{post.title}</li>
    {/each}
  </ul>
</section>

