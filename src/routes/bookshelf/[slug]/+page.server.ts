import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';
import { updateCache, getCache } from '$lib/cacheUtils';
import type { Note } from '$lib/types';

export const load: PageServerLoad = async ({ params, parent, platform }) => {
	try {
		const { isUserAuthenticated } = await parent();

		let data = await getCache({ platform, cacheKey: params.slug });

		if (!data) {
			console.log('Cache miss. Fetching from MongoDB...');
			data = await blog.findOne({ slug: params.slug });
			updateCache({ platform, data, cacheKey: params.slug });
		}

		const { title, tags, content, created, slug, status, _id } = data;

		const webSafeNote: Note = { title, tags, content, created, slug, status, _id: _id.toString() };

		return { post: webSafeNote, isUserAuthenticated };
	} catch (error) {
		return { props: { customers: [] } };
	}
};
