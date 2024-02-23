import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const blogEntries = await blog
			.find({}, { projection: { title: 1, slug: 1, _id: 0 } })
			.limit(5)
			.toArray();

		return { status: 'ok', blogEntries };
	} catch (error) {
		return { status: 'error', error: error as Error, blogEntries: [] };
	}
};
