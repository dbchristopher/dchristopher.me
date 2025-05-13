import db from '$db/mongo';
import { normalizeDateTime } from '$lib/normalizeDateTime';
import type { InsertAuthTokenResponse, InsertNoteArgs } from '$lib/types';

export async function insertNote({
	title,
	content,
	tags,
	status,
	slug,
	seo_description,
	cloudinary_image_ids,
	header_image_id
}: InsertNoteArgs): Promise<InsertAuthTokenResponse> {
	const createdTimestamp = normalizeDateTime(new Date());

	try {
		// Insert the value into the specified collection
		const collection = db.collection('blog');
		await collection.insertOne({
			title,
			content,
			tags,
			created: createdTimestamp,
			status,
			slug,
			seo_description,
			cloudinary_image_ids,
			header_image_id
		});
		return { success: true };
	} catch (error) {
		return { success: false, error: error as Error };
	}
}
