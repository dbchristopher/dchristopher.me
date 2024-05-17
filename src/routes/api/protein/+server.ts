import { insertProteinEntry } from './insertProteinEntry';

export async function POST(event) {
	const data = await event.request.formData();
	const amount = data.get('amount');
	const description = data.get('description');

	if (
		typeof amount === 'string' &&
		typeof description === 'string' &&
		amount.length &&
		description.length
	) {
		// insert entry token into mongodb protein table
		const dbResult = await insertProteinEntry(parseInt(amount), description);
		if (dbResult.success) {
			// return success
			return new Response(JSON.stringify({ success: true }), {
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} else {
			// return failure
			return new Response(JSON.stringify(dbResult), {
				status: 500,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	}

	return new Response(JSON.stringify({ success: false }), {
		status: 500,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
