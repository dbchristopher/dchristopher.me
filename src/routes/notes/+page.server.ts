import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';
import { updateCache, getCache } from '$lib/cacheUtils';
import { NOTES_CACHE_KEY } from '$lib/constants';

export const load: PageServerLoad = async ({ parent, platform, url }) => {
	const { isUserAuthenticated } = await parent();

	const fullUrl = `${url.origin}${url.pathname}`;

	const pageMetadata = {
		title: 'Notes',
		description: 'A blog about life, health, and software development.',
		url: fullUrl
	};

	try {
		let blogEntries = await getCache({ platform, cacheKey: NOTES_CACHE_KEY });
		if (!blogEntries) {
			blogEntries = await blog
				.find(
					{ tags: { $ne: 'bookshelf' } },
					{ projection: { title: 1, slug: 1, status: 1, created: 1, tags: 1, _id: 0 } }
				)
				.sort({ created: -1 }) // sort reverse chronologically (newest on top)
				.limit(500)
				.toArray();

			await updateCache({ platform, data: blogEntries, cacheKey: NOTES_CACHE_KEY });
		}

		return { isUserAuthenticated, metadata: pageMetadata, status: 'ok', blogEntries };
	} catch (error) {
		return { status: 'error', error: error as Error, blogEntries: [] };
	}
};
