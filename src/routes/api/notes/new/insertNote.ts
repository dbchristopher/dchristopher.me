import db from '$db/mongo';
import { normalizeDateTime } from '$lib/normalizeDateTime';
import { NoteStatus } from '$lib/constants';

type InsertAuthTokenResponse = { success: true; error?: never } | { success: false; error: Error };

type InsertNoteArgs = {
	title: string,
	content: string,
	tags: string[],
	status: NoteStatus,
	slug: string
}

export async function insertNote(
	{ title, content, tags, status, slug }: InsertNoteArgs
): Promise<InsertAuthTokenResponse> {
	const createdTimestamp = normalizeDateTime(new Date());

	try {
		// Insert the value into the specified collection
		const collection = db.collection('blog');
		await collection.insertOne({ title, content, tags, created: createdTimestamp, status, slug });
		return { success: true };
	} catch (error) {
		return { success: false, error: error as Error };
	}
}
