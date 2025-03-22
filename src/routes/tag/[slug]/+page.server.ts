import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';
import { updateCache, getCache } from '$lib/cacheUtils';
import { TAG_CACHE_KEY } from '$lib/constants';
import startCase from 'lodash/startCase';

export const load: PageServerLoad = async ({ params, parent, platform, url }) => {
	const { isUserAuthenticated } = await parent();

	const fullUrl = `${url.origin}${url.pathname}`;

	const pageMetadata = {
		title: startCase(params.slug),
		description: `Discover posts tagged with ${params.slug}`,
		url: fullUrl
	};

	const cacheKey = TAG_CACHE_KEY + params.slug;

	try {
		let blogEntries = await getCache({ platform, cacheKey });
		if (!blogEntries) {
			blogEntries = await blog
				.find(
					{ tags: params.slug },
					{ projection: { title: 1, slug: 1, status: 1, created: 1, tags: 1, _id: 0 } }
				)
				.sort({ created: -1 }) // sort reverse chronologically (newest on top)
				.limit(500)
				.toArray();

			console.log(blogEntries);

			await updateCache({ platform, data: blogEntries, cacheKey });
		}

		const normalizedBlogEntries = blogEntries.map((entry) => {
			const { tags } = entry;
			return { ...entry, tags: tags.map((t) => t.trim()) };
		});

		return {
			isUserAuthenticated,
			metadata: pageMetadata,
			status: 'ok',
			blogEntries: normalizedBlogEntries
		};
	} catch (error) {
		return { status: 'error', error: error as Error, blogEntries: [] };
	}
};
