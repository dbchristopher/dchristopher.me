import db from '$db/mongo';

type InsertAuthTokenResponse = { success: true; error?: never } | { success: false; error: Error };

export async function insertProteinEntry(
	amount: number,
	description: string
): Promise<InsertAuthTokenResponse> {
	try {
		// Insert the value into the specified collection
		const collection = db.collection('protein');
		await collection.insertOne({ amount, created: new Date(), description });
		return { success: true };
	} catch (error) {
		return { success: false, error: error as Error };
	}
}
