import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';
import { updateCache, getCache } from '$lib/cacheUtils';
import { BOOKSHELF_CACHE_KEY } from '$lib/constants';

export const load: PageServerLoad = async ({ parent, platform, url }) => {
	const { isUserAuthenticated } = await parent();

	const fullUrl = `${url.origin}${url.pathname}`;

	const pageMetadata = {
		title: 'Bookshelf',
		description: 'My reading tracker since 2024',
		url: fullUrl
	};

	try {
		let blogEntries = await getCache({ platform, cacheKey: BOOKSHELF_CACHE_KEY });
		if (!blogEntries) {
			blogEntries = await blog
				.find(
					{ tags: 'bookshelf' },
					{ projection: { title: 1, slug: 1, status: 1, created: 1, tags: 1, _id: 0 } }
				)
				.sort({ created: -1 }) // sort reverse chronologically (newest on top)
				.limit(500)
				.toArray();

			await updateCache({ platform, data: blogEntries, cacheKey: BOOKSHELF_CACHE_KEY });
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
