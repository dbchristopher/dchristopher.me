import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	try {
		const blogEntries = await blog
			.find({}, { projection: { title: 1, _id: 0 } })
			.limit(5)
			.toArray();

		return { blogEntries };
	} catch (error) {
		console.error('Error querying MongoDB:', error);
		return { props: { customers: [] } };
	}
};
