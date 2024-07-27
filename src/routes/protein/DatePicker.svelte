<script lang="ts">
	import Button from 'carbon-components-svelte/src/Button/Button.svelte';
	export let date: Date;
	export let handleDateNext: () => void;
	export let handleDatePrev: () => void;
	export let handleDateReset: () => void;
	$: date;
</script>

<div class="date-picker">
	<Button on:click={handleDatePrev}>&#8592;</Button>
	<Button on:click={handleDateReset}
		>{date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}</Button
	>
	<Button on:click={handleDateNext}>&#8594;</Button>
</div>

<style>
	.date-picker {
		text-align: center;
	}
</style>
