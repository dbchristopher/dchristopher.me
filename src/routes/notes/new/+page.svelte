<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ isUserAuthenticated } = data);
</script>

{#if isUserAuthenticated}
  <!-- create a new form api endpoint for writing a new post -->
	<form>
		<label for="title">Title</label>
		<input type="text" id="title" placeholder="Title" />

		<label for="tags">Tags</label>
		<input type="text" id="tags" placeholder="Tags" />

		<label for="content">Content</label>
		<textarea id="content" placeholder="Content"></textarea>

		<button type="submit">Submit</button>
	</form>
{:else}
	<a href="/notes/auth">Sign in to continue</a>
{/if}
