import { protein } from '$db/protein';

type ProteinEntry = {
	_id: string;
	created: Date;
	amount: number;
	description: string;
};

export async function GET() {
	const options: ResponseInit = {
		status: 200,
		headers: {
			'content-type': 'application/json'
		}
	};

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

	const body: BodyInit = JSON.stringify({ entries: entriesWithSerializableId });
	return new Response(body, options);
}
