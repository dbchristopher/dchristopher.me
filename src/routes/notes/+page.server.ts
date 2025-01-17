import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';
import { updateCache, getCache } from '$lib/cacheUtils';
import { NOTES_CACHE_KEY } from '$lib/constants';

export const load: PageServerLoad = async ({ parent, platform }) => {
	const { isUserAuthenticated } = await parent();

	try {
		let blogEntries = await getCache({ platform, cacheKey: NOTES_CACHE_KEY });
		if (!blogEntries) {
			blogEntries = await blog
				.find(
					{ tags: { $ne: 'bookshelf' } },
					{ projection: { title: 1, slug: 1, status: 1, created: 1, _id: 0 } }
				)
				.sort({ created: -1 }) // sort reverse chronologically (newest on top)
				.limit(500)
				.toArray();

			await updateCache({ platform, data: blogEntries, cacheKey: NOTES_CACHE_KEY });
		}

		return { isUserAuthenticated, status: 'ok', blogEntries };
	} catch (error) {
		return { status: 'error', error: error as Error, blogEntries: [] };
	}
};
