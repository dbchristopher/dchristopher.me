import { insertNote } from './insertNote';
import { NoteStatus, IMAGE_LIST_DELIMITER } from '$lib/constants';
import { generateSlugFromTitle } from './generateSlugFromTitle';
import { normalizeTags } from '$lib/normalizeTags';
import { invalidateCache } from '$lib/cacheUtils';
import { NOTES_CACHE_KEY, HOMEPAGE_NOTES_CACHE_KEY, BOOKSHELF_CACHE_KEY } from '$lib/constants';

export async function POST({ request, platform }) {
	const data = await request.formData();
	const title = data.get('title');
	const content = data.get('content');
	const tags = normalizeTags(data.get('tags'));
	const status = data.get('status');
	const slug = generateSlugFromTitle(title);
	const seo_description = String(data.get('seo_description'));
	const header_image_id = data.get('header_image_id');
	const image_id_csv = data.get('image_id_list') ?? '';
	const cloudinary_image_ids =
		typeof image_id_csv === 'string' ? image_id_csv.split(IMAGE_LIST_DELIMITER) : [];

	if (
		typeof title === 'string' &&
		typeof content === 'string' &&
		tags.length &&
		(status === NoteStatus.DRAFT || status === NoteStatus.PUBLISHED)
	) {
		await invalidateCache({ platform, cacheKey: NOTES_CACHE_KEY });
		await invalidateCache({ platform, cacheKey: HOMEPAGE_NOTES_CACHE_KEY });
		await invalidateCache({ platform, cacheKey: BOOKSHELF_CACHE_KEY });

		// insert entry token into mongodb protein table
		const dbResult = await insertNote({
			title,
			content,
			tags,
			status,
			slug,
			seo_description,
			header_image_id: typeof header_image_id === 'string' ? header_image_id : '',
			cloudinary_image_ids
		});
		if (dbResult.success) {
			// return success
			return new Response(JSON.stringify({ success: true, slug }), {
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} else {
			// return failure
			return new Response(JSON.stringify(dbResult), {
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	}

	return new Response(JSON.stringify({ success: false }), {
		status: 500,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
