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
		// todo: validate date from parameters
		// todo: convert the shortcut "today" to a valid date

		return {
			date: date,
			metadata: {
				title: 'Protein Journal (date)',
				url: '',
				description: 'A log of my primary protein sources for THIS_DATE'
			},
			isUserAuthenticated
		};
	} else {
		throw error(404, {
			message: 'Date not found',
			errorId: 'DATE_NOT_FOUND'
		});
	}
};
