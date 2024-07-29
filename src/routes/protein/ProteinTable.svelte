<script lang="ts">
	import Button from 'carbon-components-svelte/src/Button/Button.svelte';
	export let entries: ProteinEntry[];
	export let handleDestroyEntry: (id: string) => void;
	export let isAsyncPending: boolean;
	export let isUserAuthenticated: boolean;
</script>

<div class="container">
	<table cellpadding="0" cellspacing="0">
		<thead>
			<tr>
				<th>Amount</th>
				<th>Description</th>
				<th /><!-- delete button-->
			</tr>
		</thead>

		<tbody class={isAsyncPending ? 'async-pending' : ''}>
			{#each entries as entry}
				<tr>
					<td>{entry.amount}</td>
					<td>{entry.description}</td>
					<td class="delete">
						{#if isUserAuthenticated}
							<Button kind="tertiary" on:click={() => handleDestroyEntry(entry._id)} disabled={isAsyncPending}
								size="small">delete</Button
							>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.container {
		padding: 0.5rem;
		width: 100%;
	}
	table {
		width: 100%;
	}
	th,
	td {
		text-align: left;
		padding: 0.25rem;
		border-bottom: 1px solid #ddd;
	}
	td.delete {
		text-align: right;
	}
</style>
