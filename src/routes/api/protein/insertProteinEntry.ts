import db from '$db/mongo';
import { normalizeDateTime } from '$lib/normalizeDateTime';

type InsertAuthTokenResponse = { success: true; error?: never } | { success: false; error: Error };

export async function insertProteinEntry(
	amount: number,
	description: string
): Promise<InsertAuthTokenResponse> {
	const createdTimestamp = normalizeDateTime(new Date());

	try {
		// Insert the value into the specified collection
		const collection = db.collection('protein');
		await collection.insertOne({ amount, created: createdTimestamp, description });
		return { success: true };
	} catch (error) {
		return { success: false, error: error as Error };
	}
}
