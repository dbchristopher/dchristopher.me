<script>
	import { title } from '$lib/store';
	import ContentWrapper from '$lib/ContentWrapper.svelte';
	title.set('About');
</script>

<ContentWrapper>
	<article>
		<header>
			<h1>About</h1>
		</header>
		<div class="content">
			<p>I'm a marginally online, non-influencer. Not a guru or a thought leader.</p>
			<p>
				Professionaly, I'm a software developer, though I'll only occasionally write about that. I'm
				just a guy trying to figure out life, and I wanted my own little slice of the internet to
				share some things I'm thinking about.
			</p>
		</div>
	</article>
</ContentWrapper>

<style>
	p {
		margin-bottom: 1rem;
	}

	ul {
		margin-bottom: 1rem;
		list-style: inside;
	}
</style>
