import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';
import { updateCache, getCache } from '$lib/cacheUtils';
import { HOMEPAGE_NOTES_CACHE_KEY } from '$lib/constants';

export const load: PageServerLoad = async ({ parent, platform }) => {
	const { isUserAuthenticated } = await parent();

	try {
		let recentEntries = await getCache({ platform, cacheKey: HOMEPAGE_NOTES_CACHE_KEY });

		if (!recentEntries) {
			recentEntries = await blog
				.find(
					{},
					{ projection: { title: 1, tags: 1, slug: 1, status: 1, content: 1, created: 1, _id: 0 } }
				)
				.sort({ created: -1 }) // sort reverse chronologically (newest on top)
				.limit(10)
				.toArray();

			updateCache({ platform, data: recentEntries, cacheKey: HOMEPAGE_NOTES_CACHE_KEY });
		}

		const { blogEntries, bookshelfEntries } = recentEntries.reduce(
			(acc, entry) => {
				if (entry.tags.includes('bookshelf')) {
					return { ...acc, bookshelfEntries: [...acc.bookshelfEntries, entry] };
				}
				return { ...acc, blogEntries: [...acc.blogEntries, entry] };
			},
			{ blogEntries: [], bookshelfEntries: [] }
		);

		return { isUserAuthenticated, status: 'ok', blogEntries, bookshelfEntries };
	} catch (error) {
		return { status: 'error', error: error as Error, blogEntries: [], bookshelfEntries: [] };
	}
};
