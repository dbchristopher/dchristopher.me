import { error } from '@sveltejs/kit';
import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';
import { updateCache, getCache } from '$lib/cacheUtils';
import { isValidDateString } from '../utils/isValidDateString';
import { getDateFromSlug } from '../utils/getDateFromSlug';

export const load: PageServerLoad = async ({ params, parent, platform, url }) => {
	const { isUserAuthenticated } = await parent();

	const date = getDateFromSlug(params.slug);

	if (isValidDateString(date)) {
		const responseData = {
			date,
			metadata: {
				title: `Protein Journal (${date})`,
				url: url.pathname,
				description: `A log of my primary protein sources for ${date}`
			},
			isUserAuthenticated
		};

		return responseData;
	} else {
		throw error(404, {
			message: 'Date not found',
			errorId: 'DATE_NOT_FOUND'
		});
	}
};
