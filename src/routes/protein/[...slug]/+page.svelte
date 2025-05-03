<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import SEO from '$lib/SEO.svelte';
	import DatePicker from './DatePicker.svelte';
	import ContentWrapper from '$lib/ContentWrapper.svelte';
	import ProteinCounter from './ProteinCounter.svelte';
	import ProteinTable from './ProteinTable.svelte';
	import ProteinInputForm from './ProteinInputForm.svelte';
	import Faq from './Faq.svelte';
	import { insertEntry } from '../utils/insertEntry';
	import { destroyEntry } from '../utils/destroyEntry';

	type ProteinEntryResponse = { entries: ProteinEntry[] };

	const isProteinEntryList = (response: unknown): response is ProteinEntryResponse => {
		// Check if response is a non-null object
		if (typeof response !== 'object' || response === null) {
			return false;
		}

		// Check if entries exists and is an array
		const responseObj = response as Record<string, unknown>;
		if (!('entries' in responseObj) || !Array.isArray(responseObj.entries)) {
			return false;
		}
		// Validate each entry in the array
		return 'amount' in responseObj.entries[0];
	};

	const { data } = $props<{ data: PageData }>();

	// Use single $derived for related data
	const { date, isUserAuthenticated, metadata, entries } = $derived(data);

	// Parse date after getting it from data
	const dateParsed = $derived(new Date(date));

	let clientData = $state<ProteinEntry[]>([]);
	let isLoading = $state(false);

	$effect(() => {
		clientData = entries;
	});

	const handleInsertEntry = async (event: Event) => {
		event.preventDefault();
		if (isUserAuthenticated) {
			optimisticallyUpdate(event);
			await insertEntry(event, refreshData);
		}
	};

	const optimisticallyUpdate = (event: Event) => {
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		const amount = data.get('amount');
		const description = data.get('description');
		if (typeof amount === 'string' && typeof description === 'string') {
			clientData = [
				...clientData,
				{ amount: parseInt(amount ?? ''), description, _id: '12345', created: new Date() }
			];
		}
	};

	const handleDestroyEntry = async (id: string) => {
		await destroyEntry(id, date, refreshData);
	};

	const refreshData = async () => {
		isLoading = true;
		try {
			const response = await fetch(`/api/protein/entries?date=${date}`, {
				method: 'GET'
			});
			const draftData = await response.json();
			if (isProteinEntryList(draftData)) {
				clientData = draftData.entries;
			}
		} catch (error) {
			console.error('Failed to refresh data:', error);
		} finally {
			isLoading = false;
		}
	};

	let totalConsumption = $derived(
		(clientData.length ? clientData : entries).reduce(
			(acc: number, entry: ProteinEntry) => acc + entry.amount,
			0
		)
	);
</script>

<SEO {metadata} />

<div class="page-wrapper">
	<ContentWrapper>
		<article>
			<div class="page-grid">
				<header>
					<h1>Protein Journal</h1>
				</header>

				<ProteinCounter {totalConsumption} />
				<DatePicker date={dateParsed} />

				<ProteinTable
					{isLoading}
					entries={clientData.length ? clientData : entries}
					{handleDestroyEntry}
					{isUserAuthenticated}
				/>

				{#if !isUserAuthenticated}
					<a href="/notes/auth">Sign in manage data</a>

					<Faq />
				{/if}
			</div>
		</article>
		{#if isUserAuthenticated}
			<div class="input-form-wrapper">
				<ProteinInputForm date={dateParsed} {handleInsertEntry} />
			</div>
		{/if}
	</ContentWrapper>
</div>

<style>
	.page-wrapper {
		position: relative;
	}
	.page-grid {
		display: grid;
		grid-row-gap: 1rem;
	}

	.page-grid h1 {
		margin-top: 0.25rem;
	}
	.input-form-wrapper {
		padding-top: 10px;
		background: white;
	}

	@media (max-width: 768px) {
		.input-form-wrapper {
			position: sticky;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}

	@keyframes pendingFade {
		0% {
			opacity: 0.7;
		}
		50% {
			opacity: 0.3;
		}
		100% {
			opacity: 0.7;
		}
	}
	:global(.async-pending) {
		animation: pendingFade ease-in-out 1.5s infinite;
	}
</style>
