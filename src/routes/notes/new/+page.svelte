<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ isUserAuthenticated } = data);

  // todo: render a form to create a new note if isUserAuthenticated
</script>

<p>{isUserAuthenticated}</p>

<a href="/notes/auth">Sign in to continue</a>
