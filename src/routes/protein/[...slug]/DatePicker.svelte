<script lang="ts">
	import { formatDateString } from '../utils/formatDateString';
	import { isDateBefore } from '../utils/isDateBefore';
	import { getAdjacentDates } from '../utils/getAdjacentDates';
	interface Props {
		date: Date;
	}

	let { date }: Props = $props();

	const today = new Date();
	const proteinLogStartDate = new Date('2024-05-17');
	const [prevDate, nextDate] = $derived(getAdjacentDates(date));
	$effect(() => {
		// console.log({ prevDate, nextDate });
	});
</script>

<div class="date-picker">
	{#if isDateBefore(proteinLogStartDate, date)}
		<a href="/protein/{formatDateString(prevDate)}">
			<md-text-button>&#8592;</md-text-button>
		</a>
	{:else}
		<md-text-button>&#8592;</md-text-button>
	{/if}
	<a href="/protein/today">
		<md-filled-tonal-button kind="tertiary">
			{date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}
		</md-filled-tonal-button>
	</a>
	{#if isDateBefore(nextDate, today)}
		<a href="/protein/{formatDateString(nextDate)}">
			<md-text-button>&#8594;</md-text-button>
		</a>
	{:else}
		<a href="/protein/today">
			<md-text-button>&#8594;</md-text-button>
		</a>
	{/if}
</div>

<style>
	.date-picker {
		text-align: center;
		display: grid;
		grid-template-columns: auto auto auto;
	}
</style>
