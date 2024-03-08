import { authTable } from '$db/authTable';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('session');

	if (token) {
		const user = await authTable.findOne({ token });
		return {
			isUserAuthenticated: !!user
		};
	} else {
		return { isUserAuthenticated: false };
	}
};
