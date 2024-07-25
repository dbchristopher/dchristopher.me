import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
	try {
		const { isUserAuthenticated } = await parent();

		const blogEntries = await blog.find({ slug: params.slug }).limit(1).toArray();

		return { post: { ...blogEntries[0], _id: blogEntries[0]._id.toString() }, isUserAuthenticated };
	} catch (error) {
		return { props: { customers: [] } };
	}
};
