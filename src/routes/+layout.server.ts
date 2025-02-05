import { authTable } from '$db/authTable';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('session');
	const metadata = {
		title: 'Home',
		description:
			"I'm a parent, a fitness enthusiast, and I built my own independent slice of the internet to share some things I'm thinking about.",
		url: 'https://www.dchristopher.me'
	};

	if (token) {
		const user = await authTable.findOne({ token });
		return {
			isUserAuthenticated: !!user,
			metadata
		};
	} else {
		return { isUserAuthenticated: false, metadata };
	}
};
