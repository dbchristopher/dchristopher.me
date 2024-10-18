import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';
import { updateCache, getCache } from '$lib/cacheUtils';
import type { Note } from '$lib/types';

export const load: PageServerLoad = async ({ params, parent, platform }) => {
	try {
		const { isUserAuthenticated } = await parent();

		let data: Note = await getCache({ platform, cacheKey: params.slug });

		if (!data) {
			console.log('Cache miss. Fetching from MongoDB...');
			const dataArr = await blog.find({ slug: params.slug }).limit(1).toArray();
			data = dataArr[0];
			updateCache({ platform, data, cacheKey: params.slug });
		}

		const { title, tags, content, created, slug, status, _id } = data;

		const webSafeNote: Note = { title, tags, content, created, slug, status, _id: _id.toString() };

		return { post: webSafeNote, isUserAuthenticated };
	} catch (error) {
		return { props: { customers: [] } };
	}
};
