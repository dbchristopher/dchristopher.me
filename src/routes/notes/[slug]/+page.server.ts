import { blog } from '$db/blog';
import { redirect } from '@sveltejs/kit';
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

	try {
		const { isUserAuthenticated } = await parent();

		let blogEntry = await getCache({ platform, cacheKey: params.slug });

		if (!blogEntry) {
			console.log('Cache miss. Fetching from MongoDB...');
			blogEntry = await blog.findOne({ slug: params.slug });

			if (!blogEntry) {
				return {
					status: 'error',
					errorMessage: 'Post not found',
					post: null,
					isUserAuthenticated
				};
			}

			await updateCache({ platform, data: blogEntry, cacheKey: params.slug });
		}

		// Handle redirect before processing the entry
		if (blogEntry.tags?.includes('bookshelf')) {
			return {
				status: 'redirect',
				location: `/bookshelf/${params.slug}`
			};
		}

		const { _id } = blogEntry;
		const webSafeNote: Note = {
			...blogEntry,
			_id: _id.toString()
		};

		pageMetadata.description = webSafeNote.seo_description;
		pageMetadata.title = webSafeNote.title;

		return {
			status: 'ok',
			post: webSafeNote,
			isUserAuthenticated,
			metadata: pageMetadata
		};
	} catch (error) {
		console.error('Error in load function:', error);

		return {
			status: 'error',
			errorMessage: error instanceof Error ? error.message : 'An unknown error occurred',
			post: null,
			isUserAuthenticated: false
		};
	}
};
