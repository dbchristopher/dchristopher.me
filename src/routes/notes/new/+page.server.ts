import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, url }) => {
	const fullUrl = `${url.origin}${url.pathname}`;

	const pageMetadata = {
		title: 'New Note',
		description: '',
		url: fullUrl
	};
	const { isUserAuthenticated } = await parent();

	return {
		metadata: pageMetadata,
		isUserAuthenticated
	};
};
