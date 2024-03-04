import { authTable } from '$db/authTable';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	try {
		const userAuthToken = url.searchParams.get('token');
		const newestAuthEntry = await authTable.find().sort({ timestamp: -1 }).limit(1).toArray();

		if (userAuthToken === newestAuthEntry[0].token) {
			// todo - remove auth token from db after use
			return { isAuthorized: true };
		} else {
			return { isAuthorized: false };
		}
	} catch (error) {
		console.error('Error querying MongoDB:', error);
		return { props: { customers: [] } };
	}
};
