<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	$effect.pre(() => {
		if (browser && !data.isUserAuthenticated) {
			// Redirect to home page to start restart the user journey
			if (typeof window !== 'undefined') {
				goto('/');
			}
		}
	});
</script>
