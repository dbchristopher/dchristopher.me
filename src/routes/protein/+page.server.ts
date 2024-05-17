import { protein } from '$db/protein';
import type { PageServerLoad } from './$types';

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

	const entriesWithSerializableId = entries.map((entry) => ({
		...entry,
		_id: entry._id.toString()
	}));

	return {
		isUserAuthenticated,
		entries: entriesWithSerializableId
	};
};
