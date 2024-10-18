import db from '$db/mongo';
import { normalizeDateTime } from '$lib/normalizeDateTime';
import type { InsertNoteArgs, InsertAuthTokenResponse } from '$lib/types';
import { ObjectId } from 'mongodb';

export async function patchNote(
	id: string,
	{ title, content, tags, status }: InsertNoteArgs
): Promise<InsertAuthTokenResponse> {
	const createdTimestamp = normalizeDateTime(new Date());

	try {
		// Insert the value into the specified collection
		const collection = db.collection('blog');

		await collection.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: { title, content, tags, created: createdTimestamp, status } }
		);

		return { success: true };
	} catch (error) {
		console.log(error);
		return { success: false, error: error as Error };
	}
}
