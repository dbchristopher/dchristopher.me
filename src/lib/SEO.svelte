<script>
	export let metadata = {
		title: '',
		description: '',
		url: ''
	};

	$: titleFormatted = `${metadata.title} • Daniel Christopher`;
</script>

<svelte:head>
	<title>{titleFormatted}</title>
	<meta name="description" content={metadata.description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={metadata.url} />
	<meta property="og:title" content={titleFormatted} />
	<meta property="og:description" content={metadata.description} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={metadata.url} />
	<meta property="twitter:title" content={titleFormatted} />
	<meta property="twitter:description" content={metadata.description} />
</svelte:head>
