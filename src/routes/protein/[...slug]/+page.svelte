<script lang="ts">
	import type { PageData } from './$types';
	import SEO from '$lib/SEO.svelte';
	import DatePicker from './DatePicker.svelte';

	const { data } = $props<{ data: PageData }>();

	// Use single $derived for related data
	const { date, isUserAuthenticated, metadata } = $derived(data);

	// Parse date after getting it from data
	const dateParsed = $derived(new Date(date));
</script>

<SEO {metadata} />

{date}

<DatePicker date={dateParsed} />
