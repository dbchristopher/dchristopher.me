import { customers } from '$db/customers';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const data = await customers
			.find({}, { projection: { name: 1, _id: 0 } })
			.limit(5)
			.toArray();

		return { customers: data };
	} catch (error) {
		console.error('Error querying MongoDB:', error);
		return { props: { customers: [] } };
	}
};
