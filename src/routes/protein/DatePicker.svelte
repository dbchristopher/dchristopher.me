<script lang="ts">
	export let date: Date;
	export let handleDateNext: () => void;
	export let handleDatePrev: () => void;
	export let handleDateReset: () => void;
	$: date;
</script>

<div class="date-picker">
	<button on:click={handleDatePrev}>&#8592;</button>
	<button on:click={handleDateReset}
		>{date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}</button
	>
	<button on:click={handleDateNext}>&#8594;</button>
</div>

<style>
	.date-picker {
		text-align: center;
	}
	button {
		padding: 0.5rem 1rem;
		line-height: 1rem;
		font-size: 0.75rem;
	}
</style>
