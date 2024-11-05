<script lang="ts">
	import { run } from 'svelte/legacy';

	import Button from 'carbon-components-svelte/src/Button/Button.svelte';
	interface Props {
		date: Date;
		handleDateNext: () => void;
		handleDatePrev: () => void;
		handleDateReset: () => void;
	}

	let { date, handleDateNext, handleDatePrev, handleDateReset }: Props = $props();
	run(() => {
		date;
	});
</script>

<div class="date-picker">
	<Button on:click={handleDatePrev}>&#8592;</Button>
	<Button kind="tertiary" on:click={handleDateReset}
		>{date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}</Button
	>
	<Button on:click={handleDateNext}>&#8594;</Button>
</div>

<style>
	.date-picker {
		text-align: center;
	}
</style>
