<!-- CopyButton.svelte -->
<script lang="ts">
	interface Props {
		value: string;
	}

	let { value }: Props = $props();

	let copied = $state(false);

	async function copyToClipboard(e: Event) {
		e.preventDefault();
		try {
			await navigator.clipboard.writeText(value);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	}
</script>

<button onclick={copyToClipboard} class="copy-btn medium secondary">
	{#if copied}
		<span class="icon">✓</span>
		Copied!
	{:else}
		<span class="icon">📋</span>
		Copy
	{/if}
</button>

<style>
	.copy-btn {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.copy-btn.medium {
		padding: 8px 16px;
		font-size: 14px;
	}

	.copy-btn.secondary {
		background-color: #e5e7eb;
		color: #374151;
	}

	.copy-btn.secondary:hover {
		background-color: #d1d5db;
	}

	.icon {
		font-size: 14px;
	}
</style>
