import db from '$db/mongo';

type InsertAuthTokenResponse = { success: true; error?: never } | { success: false; error: Error };

export async function insertProteinEntry(
	amount: number,
	description: string
): Promise<InsertAuthTokenResponse> {
	// Determine if daylight saving time is in effect
	const isDST = new Date().getTimezoneOffset() < 480;

	// Pacific Time offset (7 hours for DST, 8 hours otherwise)
	const pacificTimeOffset = isDST ? 7 : 8;

	const now = new Date();

	// Adjust the date to Pacific Time
	now.setHours(now.getHours() - pacificTimeOffset);

	const createdTimestamp = new Date(
		Date.UTC(
			now.getUTCFullYear(),
			now.getUTCMonth(),
			now.getUTCDate(),
			now.getUTCHours(),
			now.getUTCMinutes(),
			now.getUTCSeconds()
		)
	);

	try {
		// Insert the value into the specified collection
		const collection = db.collection('protein');
		await collection.insertOne({ amount, created: createdTimestamp, description });
		return { success: true };
	} catch (error) {
		return { success: false, error: error as Error };
	}
}
