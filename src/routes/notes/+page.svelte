<script lang="ts">
	import type { PageData } from "./$types";

  export let data: PageData;

  $: ({customers} = data)
</script>

<h1>Notes</h1>

<section>
  <h2>Customers</h2>
  <ul>
    {#each customers as customer}
      <li>{customer.name}</li>
    {/each}
  </ul>
</section>

