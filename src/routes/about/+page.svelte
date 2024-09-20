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
			<p>
				I'm a software developer who brings ideas to life through code, a fitness enthusiast always
				striving for personal growth, a writer exploring diverse topics, and a dedicated parent.
			</p>
			<p>
				I created this website as a throwback to a time when the internet was a little more DIY. I'm
				tired of the consolidation of the internet into a few major social network players and
				simply wanted my own custom-built playground. I may be intentionally isolating myself from
				social networking opportunities, but it feels good to fully control my own work and content.
			</p>
			<p>This was crafted with the following technologies:</p>
			<ul>
				<li>SvelteKit</li>
				<li>MongoDB</li>
				<li>Netlify</li>
			</ul>
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
