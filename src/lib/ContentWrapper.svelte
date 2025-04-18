<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<main>
	{@render children?.()}
</main>

<style>
	main {
		padding: 0 1rem;
		max-width: 70ch;
		margin: 0 auto 4rem;
		line-height: 1.5;
		min-height: 70vh;
	}
</style>
