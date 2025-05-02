<script lang="ts">
	import ContentWrapper from '$lib/ContentWrapper.svelte';
</script>

<footer>
	<ContentWrapper>
		<div class="footer-content-wrapper">
			<p class="copyright">© {new Date().getFullYear()} Daniel Christopher</p>
		</div>
	</ContentWrapper>
</footer>

<style>
	footer {
		text-align: left;
	}

	.footer-content-wrapper {
		padding: 1rem 0;
	}

	.footer-content-wrapper p {
		font-size: 0.75rem;
	}
	.copyright {
		color: #444;
	}
</style>
