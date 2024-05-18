import { protein } from '$db/protein';

export async function fetchProteinEntries(date: Date) {
	const startOfDay = new Date(date.getTime());
	startOfDay.setHours(0, 0, 0, 0);

	const endOfDay = new Date(date.getTime());
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
