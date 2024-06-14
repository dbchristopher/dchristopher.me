import type { PageServerLoad } from './$types';
import { parseISO, isValid } from 'date-fns';
import { fetchEntries } from '../utils/fetchEntries';

export const load: PageServerLoad = async ({ parent, params, fetch }) => {
	const { isUserAuthenticated } = await parent();

	const [, date] = params.slug.split('_');

	const parsedDate = parseISO(date + 'T00:00:00.000Z');
	const dateFromSlug = isValid(parsedDate) ? new Date(Date.now()) : parsedDate;

	const entries = await fetchEntries(dateFromSlug, fetch);

	return {
		isUserAuthenticated,
		entries,
		dateFromSlug
	};
};
