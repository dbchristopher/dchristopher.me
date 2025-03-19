<script lang="ts">
	interface Props {
		entries: ProteinEntry[];
		handleDestroyEntry: (id: string) => void;
		isUserAuthenticated: boolean;
		isLoading: boolean;
	}

	let { entries, handleDestroyEntry, isUserAuthenticated, isLoading }: Props = $props();
</script>

<div class="container">
	<table cellpadding="0" cellspacing="0">
		<thead>
			<tr>
				<th>Amount</th>
				<th>Description</th>
				<th></th><!-- delete button-->
			</tr>
		</thead>

		<tbody>
			{#each entries as entry}
				<tr>
					<td>{entry.amount}</td>
					<td>{entry.description}</td>
					<td class="delete">
						{#if isUserAuthenticated}
							<md-outlined-button
								kind="tertiary"
								role="button"
								tabindex="0"
								onclick={() => handleDestroyEntry(entry._id)}
								onkeypress={() => {}}
								disabled={isLoading}
								size="small">delete</md-outlined-button
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
