import { protein } from '$db/protein';
import type { PageServerLoad } from './$types';

type ProteinEntry = {
	_id: string;
	created: Date;
	amount: number;
	description: string;
};

export const load: PageServerLoad = async ({ parent }) => {
	const { isUserAuthenticated } = await parent();

	const startOfDay = new Date();
	startOfDay.setHours(0, 0, 0, 0);

	const endOfDay = new Date();
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

	return {
		isUserAuthenticated,
		entries: entriesWithSerializableId
	};
};
