import { authTable } from '$db/authTable';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('session');
	const user = await authTable.findOne({ token });

	return {
		isUserAuthenticated: !!user
	};
};
