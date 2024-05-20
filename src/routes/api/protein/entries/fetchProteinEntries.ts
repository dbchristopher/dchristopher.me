import { protein } from '$db/protein';
import { normalizeDateTime } from '$lib/normalizeDateTime';

export async function fetchProteinEntries(date: Date) {
	const startOfDay = normalizeDateTime(date);
	startOfDay.setHours(0, 0, 0, 0);

	const endOfDay = normalizeDateTime(date);
	endOfDay.setHours(23, 59, 59, 999);

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
