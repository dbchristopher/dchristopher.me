import db from '$db/mongo';
import { normalizeDateTime } from '$lib/normalizeDateTime';
import type { InsertNoteArgs, InsertAuthTokenResponse } from '$lib/types';
import { ObjectId } from 'mongodb';

export async function patchNote(
	id: string,
	{
		title,
		content,
		tags,
		status,
		seo_description,
		header_image_id,
		cloudinary_image_ids
	}: InsertNoteArgs
): Promise<InsertAuthTokenResponse> {
	const updatedTimestamp = normalizeDateTime(new Date());

	try {
		// Insert the value into the specified collection
		const collection = db.collection('blog');

		await collection.updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: {
					title,
					content,
					tags,
					updated: updatedTimestamp,
					status,
					seo_description,
					header_image_id,
					cloudinary_image_ids
				}
			}
		);

		return { success: true };
	} catch (error) {
		console.log(error);
		return { success: false, error: error as Error };
	}
}
