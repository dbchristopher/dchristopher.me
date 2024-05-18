import type { PageServerLoad } from './$types';
import { fetchProteinEntries } from '$lib/fetchProteinEntries';

export const load: PageServerLoad = async ({ parent }) => {
	const { isUserAuthenticated } = await parent();

	const proteinEntries = await fetchProteinEntries();

	return {
		isUserAuthenticated,
		entries: proteinEntries
	};
};
