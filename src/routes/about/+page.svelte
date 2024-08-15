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
				simply wanted my own custom-built playground. My writing may never attain the reach that it
				could on a platform like Medium, but it feels good to have a personal outlet that is fully
				mine.
			</p>
			<p>This was lovingly crafted with the following technologies:</p>
			<ul>
				<li>SvelteKit</li>
				<li>MongoDB</li>
				<li>Netlify</li>
			</ul>
		</div>
	</article>
</ContentWrapper>

<style>
</style>
