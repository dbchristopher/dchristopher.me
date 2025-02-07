<script lang="ts">
	import type { PageData } from './$types';
	import SEO from '$lib/SEO.svelte';
	import DatePicker from './DatePicker.svelte';
	import ContentWrapper from '$lib/ContentWrapper.svelte';
	import ProteinCounter from './ProteinCounter.svelte';
	import ProteinTable from './ProteinTable.svelte';
	import ProteinInputForm from './ProteinInputForm.svelte';
	import Faq from './Faq.svelte';

	const { data } = $props<{ data: PageData }>();

	// Use single $derived for related data
	const { date, isUserAuthenticated, metadata } = $derived(data);

	// Parse date after getting it from data
	const dateParsed = $derived(new Date(date));
</script>

<SEO {metadata} />

<div class="page-wrapper">
	<ContentWrapper>
		<article>
			<div class="page-grid">
				<header>
					<h1>Protein Journal</h1>
				</header>
				<DatePicker date={dateParsed} />

				<!-- <ProteinCounter {totalConsumption} {isAsyncPending} />

				<ProteinTable {entries} {handleDestroyEntry} {isAsyncPending} {isUserAuthenticated} /> -->

				{#if !isUserAuthenticated}
					<a href="/notes/auth">Sign in manage data</a>

					<Faq />
				{/if}
			</div>
		</article>
	</ContentWrapper>
	{#if isUserAuthenticated}
		<div class="input-form-wrapper">
			<!-- <ProteinInputForm {date} {handleInsertEntry} {isAsyncPending} /> -->
		</div>
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

	.page-grid h1 {
		margin-top: 0.25rem;
	}

	.input-form-wrapper {
		max-width: 65ch;
		margin: 0 auto;
		padding: 0.5rem 1rem;
		border-top: 1px solid #e0e0e0;
		background: #fff;
	}

	@media (max-width: 768px) {
		.input-form-wrapper {
			box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);
			position: sticky;
			left: 0;
			right: 0;
			bottom: 0;
		}
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
