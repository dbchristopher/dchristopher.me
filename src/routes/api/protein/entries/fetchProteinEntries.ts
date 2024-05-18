import { protein } from '$db/protein';

export async function fetchProteinEntries(date: Date) {
	// Determine if daylight saving time is in effect
	const isDST = new Date().getTimezoneOffset() < 480;

	// Pacific Time offset (7 hours for DST, 8 hours otherwise)
	const pacificTimeOffset = isDST ? 7 : 8;

	// Adjust the date to Pacific Time
	date.setHours(date.getHours() - pacificTimeOffset);

	const startOfDay = new Date(
		Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0)
	);

	const endOfDay = new Date(
		Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59)
	);

	const entries = await protein
		.find({
			created: {
				$gte: startOfDay,
				$lte: endOfDay
			}
		})
		.toArray();

	const entriesWithSerializableId: ProteinEntry[] = entries.map((entry) => ({
		amount: entry.amount,
		created: entry.created,
		description: entry.description,
		_id: entry._id.toString()
	}));

	return entriesWithSerializableId;
}
