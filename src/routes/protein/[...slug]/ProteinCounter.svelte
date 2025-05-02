<script lang="ts">
	interface Props {
		totalConsumption: number;
	}

	let { totalConsumption }: Props = $props();
</script>

<div class="total">
	<p class="total__label">Protein:</p>
	<strong class="total__callout">{totalConsumption}g</strong>
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
		font-size: 2rem;
		line-height: 2.2rem;
	}
</style>
