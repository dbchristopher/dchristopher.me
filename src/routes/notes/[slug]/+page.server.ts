import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const blogEntries = await blog
			.find({ slug: params.slug }, { projection: { created: 0, _id: 0 } })
			.limit(1)
			.toArray();

		return { post: blogEntries[0] };
	} catch (error) {
		console.error('Error querying MongoDB:', error);
		return { props: { customers: [] } };
	}
};
