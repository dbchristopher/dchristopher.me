<script lang="ts">
	import ContentWrapper from '$lib/ContentWrapper.svelte';
	import SEO from '$lib/SEO.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<SEO metadata={data.metadata} />

<ContentWrapper>
	<article>
		<header>
			<h1>About</h1>
		</header>
		<div class="content">
			<img src="/images/pfp.jpg" class="pfp" alt="author photo" />

			<div class="text">
				<p>Marginally online. Not a guru or a thought leader or an influencer.</p>
				<p>
					Professionally: I'm a software developer, though I'll only occasionally write about that.
					I'm a parent, a fitness enthusiast, and I built my own independent slice of the internet
					to share some things I'm thinking about.
				</p>
			</div>
		</div>
	</article>
</ContentWrapper>

<style>
	.pfp {
		border-radius: 100%;
	}
	.content {
		display: grid;
		grid-template-columns: 1fr 3fr;
		grid-gap: 1rem;
		align-items: top;
	}
	p {
		margin-bottom: 1rem;
		margin-top: 0;
	}

	ul {
		margin-bottom: 1rem;
		list-style: inside;
	}
</style>
