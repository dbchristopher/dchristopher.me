import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';
import type { Note } from '$lib/types';

export const load: PageServerLoad = async ({ params, parent, url }) => {
	try {
		const fullUrl = `${url.origin}${url.pathname}`;

		const pageMetadata = {
			title: 'Edit Note',
			description: '',
			url: fullUrl
		};

		const { isUserAuthenticated } = await parent();

		const blogEntries = await blog.find({ slug: params.slug }).limit(1).toArray();

		return {
			post: { ...blogEntries[0], _id: blogEntries[0]._id.toString() } as Note,
			metadata: pageMetadata,
			isUserAuthenticated
		};
	} catch (error) {
		return { props: { customers: [] } };
	}
};
