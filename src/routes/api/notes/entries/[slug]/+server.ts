import { ObjectId } from 'mongodb';
import { blog } from '$db/blog';
import { invalidateCache } from '$lib/cacheUtils';
import { NOTES_CACHE_KEY, HOMEPAGE_NOTES_CACHE_KEY, IMAGE_LIST_DELIMITER } from '$lib/constants';
import { normalizeTags } from '$lib/normalizeTags';
import { patchNote } from './patchNote';

export async function DELETE({ params, platform }) {
	const entryId = params.slug;

	try {
		await invalidateCache({ platform, cacheKey: NOTES_CACHE_KEY });

		const result = await blog.deleteOne({ _id: new ObjectId(entryId) });

		if (result.deletedCount === 0) {
			const options: ResponseInit = {
				status: 404
			};
			const responseBody: BodyInit = JSON.stringify({ message: 'Entry not found' });
			return new Response(responseBody, options);
		}

		const options: ResponseInit = {
			status: 200
		};
		const responseBody: BodyInit = JSON.stringify({ ok: true });

		return new Response(responseBody, options);
	} catch (error) {
		console.error('Error deleting entry:', error);
		const options: ResponseInit = {
			status: 500
		};
		const responseBody: BodyInit = JSON.stringify({ message: (error as Error).message });

		return new Response(responseBody, options);
	}
}

export async function PATCH({ params, request, platform }) {
	const entryId = params.slug;

	const data = await request.formData();
	const title = data.get('title');
	const content = data.get('content');
	const tags = normalizeTags(data.get('tags'));
	const status = data.get('status');
	const slug = data.get('slug');
	const seo_description = data.get('seo_description');
	const header_image_id = data.get('header_image_id');
	console.log('header_image_id', header_image_id);
	const image_id_csv = data.get('image_id_list') ?? '';
	const cloudinary_image_ids =
		typeof image_id_csv === 'string' ? image_id_csv.split(IMAGE_LIST_DELIMITER) : [];

	await invalidateCache({ platform, cacheKey: NOTES_CACHE_KEY });
	await invalidateCache({ platform, cacheKey: HOMEPAGE_NOTES_CACHE_KEY });

	if (typeof slug === 'string') {
		await invalidateCache({ platform, cacheKey: slug });
	}

	// insert entry token into mongodb protein table
	const dbResult = await patchNote(entryId, {
		title,
		content,
		tags,
		status,
		seo_description,
		header_image_id: typeof header_image_id === 'string' ? header_image_id : '',
		cloudinary_image_ids
	});
	if (dbResult.success) {
		// return success
		return new Response(JSON.stringify({ success: true }), {
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
