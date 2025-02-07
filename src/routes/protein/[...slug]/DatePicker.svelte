<script lang="ts">
	import { formatDateString } from '../utils/formatDateString';
	import { isDateBefore } from '../utils/isDateBefore';
	import { getAdjacentDates } from '../utils/getAdjacentDates';
	interface Props {
		date: Date;
	}

	let { date }: Props = $props();

	const today = new Date();
	const [prevDate, nextDate] = $derived(getAdjacentDates(date));
	$effect(() => {
		console.log({ prevDate, nextDate });
	});
</script>

<div class="date-picker">
	<a href="/protein/{formatDateString(prevDate)}">
		<md-filled-button>&#8592;</md-filled-button>
	</a>
	<a href="/protein/today">
		<md-filled-tonal-button kind="tertiary">
			{date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}
		</md-filled-tonal-button>
	</a>
	{#if isDateBefore(nextDate, today)}
		<a href="/protein/{formatDateString(nextDate)}">
			<md-filled-button>&#8594;</md-filled-button>
		</a>
	{:else}
		<a href="/protein/today">
			<md-filled-button>&#8594;</md-filled-button>
		</a>
	{/if}
</div>

<style>
	.date-picker {
		text-align: center;
	}
</style>
