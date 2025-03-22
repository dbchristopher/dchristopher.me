import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';
import { updateCache, getCache } from '$lib/cacheUtils';
import type { Note } from '$lib/types';

export const load: PageServerLoad = async ({ params, parent, platform, url }) => {
	const fullUrl = `${url.origin}${url.pathname}`;

	const pageMetadata = {
		title: '',
		description: '',
		url: fullUrl
	};

	const { isUserAuthenticated } = await parent();

	try {
		let data = await getCache({ platform, cacheKey: params.slug });

		if (!data) {
			console.log('Cache miss. Fetching from MongoDB...');
			data = await blog.findOne({ slug: params.slug });
			updateCache({ platform, data, cacheKey: params.slug });
		}

		const { _id } = data;

		const webSafeNote: Note = {
			...data,
			// hide bookshelf tag so that it doesn't duplicate content from the main /bookshelf route
			tags: [...data.tags.filter((t) => t !== 'bookshelf')],
			_id: _id.toString()
		};

		(pageMetadata.title = webSafeNote.title),
			(pageMetadata.description = webSafeNote.seo_description);

		return { post: webSafeNote, metadata: pageMetadata, isUserAuthenticated };
	} catch (error) {
		return { metadata: pageMetadata, isUserAuthenticated };
	}
};
