import db from '$db/mongo';

type InsertAuthTokenResponse = { success: true; error?: never } | { success: false; error: Error };

export async function insertAuthToken(newAuthToken: string): Promise<InsertAuthTokenResponse> {
	try {
		// Insert the string into the specified collection
		const collection = db.collection('authTable');
		await collection.insertOne({ token: newAuthToken, timestamp: new Date() });
		return { success: true };
	} catch (error) {
		return { success: false, error: error as Error };
	}
}
