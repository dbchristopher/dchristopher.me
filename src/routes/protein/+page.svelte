<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import ContentWrapper from '$lib/ContentWrapper.svelte';
	import DatePicker from './DatePicker.svelte';
	import ProteinCounter from './ProteinCounter.svelte';
	import ProteinTable from './ProteinTable.svelte';
	import ProteinInputForm from './ProteinInputForm.svelte';
	import Faq from './Faq.svelte';
	import { fetchEntries } from './utils/fetchEntries';
	import { insertEntry } from './utils/insertEntry';
	import { destroyEntry } from './utils/destroyEntry';
	import { title } from '$lib/store';
	export let data: PageData;
	let entries: ProteinEntry[] = [];
	let date: Date = new Date();
	let isAsyncPending: boolean;

	$: entries;
	$: ({ isUserAuthenticated } = data);
	$: totalConsumption = entries.reduce((acc, entry) => acc + entry.amount, 0);
	$: isAsyncPending = false;
	$: date;

	const setTitle = (date: Date) => {
		title.set(
			`Daily Protein Journal - ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
		);
	};

	const refreshEntryData = async () => {
		isAsyncPending = true;
		entries = await fetchEntries(date);
		isAsyncPending = false;
		setTitle(date);
	};

	onMount(async () => {
		await refreshEntryData();
	});

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

	const handleDatePrev = async () => {
		const draftDate = new Date(date);
		draftDate.setDate(date.getDate() - 1);
		date = draftDate;
		refreshEntryData();
	};

	const handleDateNext = async () => {
		const draftDate = new Date(date);
		draftDate.setDate(date.getDate() + 1);
		date = draftDate;
		refreshEntryData();
	};

	const handleDateReset = async () => {
		date = new Date();
		refreshEntryData();
	};
</script>

<div class="page-wrapper">
	<ContentWrapper>
		<div class="page-grid">
			<h1>Protein</h1>
			<DatePicker {date} {handleDateNext} {handleDatePrev} {handleDateReset} />

			<ProteinCounter {totalConsumption} {isAsyncPending} />

			<ProteinTable {entries} {handleDestroyEntry} {isAsyncPending} {isUserAuthenticated} />

			{#if !isUserAuthenticated}
				<a href="/notes/auth">Sign in manage data</a>

				<Faq />
			{/if}
		</div>
	</ContentWrapper>
	{#if isUserAuthenticated}
		<ProteinInputForm {date} {handleInsertEntry} {isAsyncPending} />
	{/if}
</div>

<style>
	.page-wrapper {
		position: relative;
	}
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
