<script lang="ts">
	import { run } from 'svelte/legacy';

	interface Props {
		date: Date;
	}

	let { date }: Props = $props();
	run(() => {
		date;
	});
</script>

<div class="date-picker">
	<md-filled-button onclick={() => {}}>&#8592;</md-filled-button>
	<a href="/protein/today" class="no-underline">
		<md-filled-tonal-button kind="tertiary" >
			{date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()}
		</md-filled-tonal-button>
	</a>
	<md-filled-button onclick={() => {}}>&#8594;</md-filled-button>
</div>

<style>
	.date-picker {
		text-align: center;
	}
</style>
