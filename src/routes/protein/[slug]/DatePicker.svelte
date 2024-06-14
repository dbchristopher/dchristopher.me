<script lang="ts">
	import { formatSlug } from '../utils/formatSlug';
	import { formatDate } from '../utils/formatDate';

	export let date: Date;

	let datePrev = new Date(date);
	datePrev.setDate(date.getDate() - 1);

	let dateNext = new Date(date);
	dateNext.setDate(date.getDate() + 1);

	let today = new Date();
	let originDate = new Date('2024-05-17'); // date of first entry

	$: date;
	$: dateNext;
	$: datePrev;

	function isDateBefore(date1: Date, date2: Date) {
		return new Date(date1.toDateString()) < new Date(date2.toDateString());
	}
	function isDateAfter(date1: Date, date2: Date) {
		return new Date(date1.toDateString()) > new Date(date2.toDateString());
	}
</script>

<div class="date-picker">
	{#if isDateAfter(datePrev, originDate)}
		<a class="date-nav" href={formatSlug(datePrev)}>&#8592;</a>
	{:else}
		<span class="date-nav">&#8592;</span>
	{/if}

	<a class="date-nav" href={formatSlug(today)}>{formatDate(date)}</a>

	{#if isDateBefore(dateNext, today)}
		<a class="date-nav" href={formatSlug(dateNext)}>&#8594;</a>
	{:else}
		<span class="date-nav">&#8594;</span>
	{/if}
</div>

<style>
	.date-picker {
		text-align: center;
	}
	.date-nav {
		display: inline-block;
		padding: 0.5rem 1rem;
		line-height: 1rem;
		font-size: 0.75rem;
	}
</style>
