import { protein } from '$db/protein';
import { normalizeDateTime } from '$lib/normalizeDateTime';

export async function fetchProteinEntries(date: Date) {
	const normalizedDateTime = normalizeDateTime(date);
	// Convert to UTC to avoid timezone shifts
	const year = normalizedDateTime.getUTCFullYear();
	const month = normalizedDateTime.getUTCMonth();
	const day = normalizedDateTime.getUTCDate();

	// Create start of day in UTC
	const startOfDay = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

	// Create end of day in UTC
	const endOfDay = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));

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
