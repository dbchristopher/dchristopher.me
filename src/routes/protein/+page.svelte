<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	export let entries: ProteinEntry[] = [];

	$: entries;
	$: ({ isUserAuthenticated } = data);
	$: totalConsumption = entries.reduce((acc, entry) => acc + entry.amount, 0);

	async function updateEntries() {
		const updatedEntriesResponse = await fetch(
			`/api/protein/entries?date=${new Date().toISOString()}`,
			{
				method: 'GET'
			}
		);

		if (updatedEntriesResponse.ok) {
			const updatedEntriesData = await updatedEntriesResponse.json();
			entries = updatedEntriesData.entries; // Update the entries variable with the new data
		}
	}

	onMount(async () => {
		await updateEntries();
	});

	async function insertEntry(event: Event) {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		try {
			const response = await fetch('/api/protein', {
				method: 'POST',
				body: data
			});

			if (!response.ok) {
				throw new Error('Protein log failed');
			}

			form.reset();
			// Fetch the updated entries from the server
			updateEntries();
		} catch (error) {
			console.error('Error during protein insertion:', error);
		}
	}

	async function destroyEntry(event: Event) {
		// TODO: delete entry by id
	}
</script>

<h1>Protein</h1>
<h3>&lt;- Date: 2024-05-17 -&gt;</h3>

<div class="total">
	<p class="total__label">Total protein:</p>
	<strong class="total__callout">{totalConsumption}g</strong>
</div>

<table>
	<thead>
		<tr>
			<th>Amount</th>
			<th>Description</th>
			<th /><!-- delete button-->
		</tr>
	</thead>

	<tbody>
		{#each entries as entry}
			<tr>
				<td>{entry.amount}</td>
				<td>{entry.description}</td>
				<td><button on:click={destroyEntry}>delete</button></td>
			</tr>
		{/each}
	</tbody>
</table>

{#if isUserAuthenticated}
	<h2>Add Intake</h2>
	<form on:submit|preventDefault={insertEntry}>
		<fieldset>
			<label for="amount">Amount</label>
			<input placeholder="g" type="number" id="amount" name="amount" required min="0" max="100" />
			<label for="description">Description</label>
			<input
				placeholder="boiled chicken"
				type="text"
				id="description"
				name="description"
				required
			/>
		</fieldset>
		<button type="submit">Submit</button>
	</form>
{:else}
	<a href="/notes/auth">Sign in to continue</a>
{/if}

<style>
	.total {
		margin: 1rem 0;
	}

	.total__label {
		margin: 0;
	}

	.total__callout {
		font-size: 3rem;
	}
</style>
