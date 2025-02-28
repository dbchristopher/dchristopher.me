import { authTable } from '$db/authTable';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, cookies, parent }) => {
	const { isUserAuthenticated } = await parent();

	const fullUrl = `${url.origin}${url.pathname}`;

	const pageMetadata = {
		title: 'Sign in',
		description: 'More about me.',
		url: fullUrl
	};

	if (isUserAuthenticated) {
		return { isUserAuthenticated: true };
	}

	try {
		const userAuthToken = url.searchParams.get('token');
		const newestAuthEntry = await authTable.find().sort({ timestamp: -1 }).limit(1).toArray();

		console.log(newestAuthEntry, userAuthToken);
		if (userAuthToken === newestAuthEntry[0].token) {
			// Create a new user session cookie
			cookies.set('session', newestAuthEntry[0].token, {
				path: '/',
				maxAge: 3600 * 24 * 90, // 90 days from now
				httpOnly: true,
				secure: true, // Set to true if using HTTPS
				sameSite: 'strict'
			});

			return { isUserAuthenticated: true, metadata: pageMetadata };
		} else {
			return { isUserAuthenticated: false, metadata: pageMetadata };
		}
	} catch (error) {
		console.error('Error querying MongoDB:', error);
		return { props: { customers: [] } };
	}
};
