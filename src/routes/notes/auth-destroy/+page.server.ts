import { authTable } from '$db/authTable';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, parent }) => {
	const { isUserAuthenticated } = await parent();

	try {
		if (isUserAuthenticated) {
			const sessionCookie = cookies.get('session');

			// delete the mongodb entry matching sessionCookie token value
			await authTable.deleteOne({ token: sessionCookie });

			// Destroy the 'session' cookie
			cookies.delete('session', {
				path: '/',
				httpOnly: true,
				secure: true, // Set to true if using HTTPS
				sameSite: 'strict'
			});

			return { isUserAuthenticated: false };
		}
	} catch (error) {
		console.error('Error querying MongoDB:', error);
		return { props: { customers: [] } };
	}
};
