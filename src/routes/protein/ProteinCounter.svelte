<script lang="ts">
	export let isAsyncPending: boolean;
	export let totalConsumption: number;
</script>

<div class="total">
	<p class="total__label">Total protein:</p>
	<strong class="total__callout {isAsyncPending ? 'async-pending' : ''}">{totalConsumption}g</strong
	>
</div>

<style>
	.total {
		text-align: center;
		border: 1px solid #ccc;
		width: fit-content;
		margin-left: auto;
		margin-right: auto;
		padding: 1rem;
		border-radius: 0.25rem;
	}
	.total__label {
		margin: 0;
	}

	.total__callout {
		font-size: 3rem;
	}
</style>
