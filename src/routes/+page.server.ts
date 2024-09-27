import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';
import { updateCache, getCache } from '$lib/cacheUtils';
import { HOMEPAGE_NOTES_CACHE_KEY } from '$lib/constants';

export const load: PageServerLoad = async ({ parent, platform }) => {
	const { isUserAuthenticated } = await parent();

	try {
		let blogEntries = await getCache({ platform, cacheKey: HOMEPAGE_NOTES_CACHE_KEY });

		if (!blogEntries) {
			blogEntries = await blog
				.find({}, { projection: { title: 1, slug: 1, status: 1, content: 1, created: 1, _id: 0 } })
				.sort({ created: -1 }) // sort reverse chronologically (newest on top)
				.limit(5)
				.toArray();

			updateCache({ platform, data: blogEntries, cacheKey: HOMEPAGE_NOTES_CACHE_KEY });
		}

		return { isUserAuthenticated, status: 'ok', blogEntries };
	} catch (error) {
		return { status: 'error', error: error as Error, blogEntries: [] };
	}
};
