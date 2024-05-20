<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	export let entries: ProteinEntry[] = [];
	export let date: Date = new Date();
	export let isAsyncPending: boolean;

	$: entries;
	$: ({ isUserAuthenticated } = data);
	$: totalConsumption = entries.reduce((acc, entry) => acc + entry.amount, 0);
	$: isAsyncPending = false;

	/**
	 * fetch all entries from the server
	 */
	async function updateEntries() {
		const updatedEntriesResponse = await fetch(`/api/protein/entries?date=${date.toISOString()}`, {
			method: 'GET'
		});

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

		if (isAsyncPending) {
			// don't insert anything while database is pending
			return false;
		}

		try {
			isAsyncPending = true;

			const response = await fetch('/api/protein', {
				method: 'POST',
				body: data
			});

			if (!response.ok) {
				throw new Error('Protein log failed');
			}

			form.reset();
			// Fetch the updated entries from the server
			await updateEntries();

			isAsyncPending = false;
		} catch (error) {
			console.error('Error during protein insertion:', error);
		}
	}

	async function destroyEntry(id: string) {
		if (isAsyncPending === false) {
			isAsyncPending = true;

			const deleteEntryResponse = await fetch(`/api/protein/entries/${id}`, {
				method: 'DELETE'
			});

			if (deleteEntryResponse.status === 200) {
				await updateEntries();
			} else {
				console.error('Error deleting entry');
			}

			isAsyncPending = false;
		}
	}
</script>

<h1>Protein</h1>
<h3>&lt;- Date: {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()} -&gt;</h3>

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
				<td><button on:click={() => destroyEntry(entry._id)}>delete</button></td>
			</tr>
		{/each}
	</tbody>
</table>

{#if isUserAuthenticated}
	<h2>Add Intake</h2>
	<form on:submit|preventDefault={insertEntry}>
		<fieldset>
			<label for="amount">Amount</label>
			<input
				placeholder="g"
				type="number"
				id="amount"
				name="amount"
				required
				min="0"
				max="100"
				disabled={isAsyncPending}
			/>
			<label for="description">Description</label>
			<input
				placeholder="boiled chicken"
				type="text"
				id="description"
				name="description"
				required
				disabled={isAsyncPending}
			/>
		</fieldset>
		<button type="submit" disabled={isAsyncPending}>Submit</button>
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
