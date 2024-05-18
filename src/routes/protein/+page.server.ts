import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { isUserAuthenticated } = await parent();

	return {
		isUserAuthenticated
	};
};
