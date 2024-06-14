<script lang="ts">
	import type { PageData } from './$types';
	import DatePicker from './DatePicker.svelte';
	import ProteinCounter from './ProteinCounter.svelte';
	import ProteinTable from './ProteinTable.svelte';
	import ProteinInputForm from './ProteinInputForm.svelte';
	import Faq from './Faq.svelte';
	import { fetchEntries } from '../utils/fetchEntries';
	import { insertEntry } from '../utils/insertEntry';
	import { destroyEntry } from '../utils/destroyEntry';

	export let data: PageData;
	let { isUserAuthenticated, entries, dateFromSlug } = data;

	$: entries = entries || [];
	$: isUserAuthenticated = isUserAuthenticated || false;
	$: dateFromSlug = dateFromSlug || new Date().toDateString();

	let date: Date = dateFromSlug;
	let isAsyncPending: boolean;

	$: totalConsumption = entries.reduce((acc, entry) => acc + entry.amount, 0);
	$: isAsyncPending = false;
	$: date;

	const refreshEntryData = async () => {
		isAsyncPending = true;
		entries = await fetchEntries(date);
		isAsyncPending = false;
	};

	const handleInsertEntry = async (event: Event) => {
		if (isAsyncPending === false && isUserAuthenticated) {
			isAsyncPending = true;
			await insertEntry(event, refreshEntryData);
			isAsyncPending = false;
		}
	};

	const handleDestroyEntry = async (id: string) => {
		if (isAsyncPending === false && isUserAuthenticated) {
			isAsyncPending = true;
			await destroyEntry(id, refreshEntryData);
			isAsyncPending = false;
		}
	};
</script>

{#await data.entries}
	loading
{:then entries}
	<div class="page-grid">
		<h1>Protein</h1>
		<DatePicker {date} />

		<ProteinCounter {totalConsumption} {isAsyncPending} />

		<ProteinTable {entries} {handleDestroyEntry} {isAsyncPending} {isUserAuthenticated} />

		{#if isUserAuthenticated}
			<ProteinInputForm {handleInsertEntry} {isAsyncPending} />
		{:else}
			<a href="/notes/auth">Sign in manage data</a>
			<Faq />
		{/if}
	</div>
{/await}

<style>
	.page-grid {
		display: grid;
		grid-row-gap: 1rem;
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
