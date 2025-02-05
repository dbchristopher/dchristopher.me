import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, url }) => {
	const { isUserAuthenticated } = await parent();

	const fullUrl = `${url.origin}${url.pathname}`;

	const pageMetadata = {
		title: 'Daily Protein Journal',
		description: 'A simple protein tracker to facilitate my own fitness goals.',
		url: fullUrl
	};

	return {
		isUserAuthenticated,
		metadata: pageMetadata
	};
};
