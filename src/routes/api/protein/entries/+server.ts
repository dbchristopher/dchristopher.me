import { fetchProteinEntries } from './fetchProteinEntries';
import { updateCache, getCache } from '$lib/cacheUtils';
import { formatDateKeywordCacheKey } from '../formatDateKeywordCacheKey';

type GetArgs = { request: Request; platform: any };

export async function GET({ request, platform }: GetArgs) {
	const url = new URL(request.url);
	const queryParams = new URLSearchParams(url.search);
	const dateString = queryParams.get('date') || '';
	const date = new Date(dateString);
	const cacheKey = formatDateKeywordCacheKey(date);

	// Try to get data from the cache
	let data: ProteinEntry[] | undefined = await getCache({ platform, cacheKey: cacheKey });

	if (!data) {
		console.log('Cache miss. Fetching from MongoDB...');

		if (dateString) {
			data = await fetchProteinEntries(date);
			updateCache({ platform, data, cacheKey });
		}
	} else {
		console.log('Cache hit!');
	}

	return new Response(JSON.stringify({ entries: data }), {
		status: 200,
		headers: {
			'content-type': 'application/json'
		}
	});
}

export const config = {
	durable: true
};
