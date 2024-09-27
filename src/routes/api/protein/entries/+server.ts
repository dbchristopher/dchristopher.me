import { fetchProteinEntries } from './fetchProteinEntries';
import { updateCache, getCache } from '$lib/cacheUtils';
import { PROTEIN_CACHE_KEY } from '$lib/constants';

type GetArgs = { request: Request; platform: any };

export async function GET({ request, platform }: GetArgs) {
	const url = new URL(request.url);

	// Try to get data from the cache
	let data: ProteinEntry[] | undefined = await getCache({ platform, cacheKey: PROTEIN_CACHE_KEY });

	if (!data) {
		console.log('Cache miss. Fetching from MongoDB...');
		const queryParams = new URLSearchParams(url.search);
		const dateString = queryParams.get('date');

		if (dateString) {
			const date = new Date(dateString);
			data = await fetchProteinEntries(date);
			updateCache({ platform, data, cacheKey: PROTEIN_CACHE_KEY });
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
