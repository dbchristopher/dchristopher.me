<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ isUserAuthenticated } = data);

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
		} catch (error) {
			console.error('Error during protein insertion:', error);
		}
	}
</script>

<h1>Protein</h1>
<h3>&lt;- Date: 2024-05-17 -&gt;</h3>
Total consumption: 0g

<table>
	<thead>
		<tr>
			<th>Amount</th>
			<th>Description</th>
			<th /><!-- delete button-->
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>17g</td>
			<td>Puff bar</td>
			<td>delete</td>
		</tr>
	</tbody>
</table>

{#if isUserAuthenticated}
	<h2>Add Intake</h2>
	<form on:submit|preventDefault={insertEntry} on:change|preventDefault={formUpdate}>
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
