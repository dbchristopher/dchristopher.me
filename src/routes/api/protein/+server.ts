import { insertProteinEntry } from './insertProteinEntry';
import { invalidateCache } from '$lib/cacheUtils';
import { formatDateKeywordCacheKey } from './formatDateKeywordCacheKey';

export async function POST({ request, platform }) {
	const data = await request.formData();
	const amount = data.get('amount');
	const description = data.get('description');
	const dateFormData = data.get('date');
	const date = dateFormData ? new Date(dateFormData as string) : new Date();
	const cacheKey = formatDateKeywordCacheKey(date);

	if (
		typeof amount === 'string' &&
		typeof description === 'string' &&
		amount.length &&
		description.length
	) {
		// insert entry token into mongodb protein table
		const dbResult = await insertProteinEntry(parseInt(amount), description, date);
		if (dbResult.success) {
			await invalidateCache({ platform, cacheKey: cacheKey });
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
