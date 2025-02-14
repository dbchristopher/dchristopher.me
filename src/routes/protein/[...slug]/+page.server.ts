import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { isValidDateString } from '../utils/isValidDateString';
import { getDateFromSlug } from '../utils/getDateFromSlug';
import type { PageServerLoadEvent } from './$types';

export const load: PageServerLoad = async ({
	params,
	parent,
	platform,
	url,
	fetch,
	cookies
}: PageServerLoadEvent) => {
	const { isUserAuthenticated } = await parent();

	const timezone = cookies.get('timezone');

	const date = getDateFromSlug(params.slug, timezone);

	if (isValidDateString(date)) {
		const dateObj = new Date(date);
		dateObj.setHours(0, 0, 0, 0);
		const response = await fetch(`/api/protein/entries?date=${dateObj.toISOString()}`, {
			method: 'GET'
		});

		const data = await response.json();

		const responseData = {
			date,
			entries: data.entries,
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
