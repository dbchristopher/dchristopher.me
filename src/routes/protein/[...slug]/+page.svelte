<script lang="ts">
	import type { PageData } from './$types';
	import SEO from '$lib/SEO.svelte';
	import DatePicker from './DatePicker.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let { date, isUserAuthenticated, metadata } = $derived(data);

	const dateParsed = $derived(new Date(date));
</script>

<SEO {metadata} />

{date}

<DatePicker date={dateParsed} />
