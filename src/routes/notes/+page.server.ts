import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { isUserAuthenticated } = await parent();

	try {
		const blogEntries = await blog
			.find({}, { projection: { title: 1, slug: 1, status: 1, created: 1, _id: 0 } })
			.sort({ created: 1 }) // sort reverse chronologically (newest on top)
			.limit(5)
			.toArray();

		return { isUserAuthenticated, status: 'ok', blogEntries };
	} catch (error) {
		return { status: 'error', error: error as Error, blogEntries: [] };
	}
};
