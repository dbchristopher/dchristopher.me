// In-memory cache as a fallback
const inMemoryCache = new Map<string, { data: any; expiry: number }>();

type CacheData = {
	platform: any;
	data?: any;
	cacheKey: string;
};

// Function to invalidate the cache
export async function invalidateCache({ platform, cacheKey }: CacheData) {
	if (platform?.context?.durable) {
		await platform.context.durable.delete(cacheKey);
	} else {
		console.log('DELETE CACHE KEY:', cacheKey);
		inMemoryCache.delete(cacheKey);
	}
}

export async function updateCache({ platform, data, cacheKey }: CacheData) {
	if (platform?.context?.durable) {
		await platform.context.durable.set(cacheKey, data, { ttl: 600 });
	} else {
		inMemoryCache.set(cacheKey, { data, expiry: Date.now() + 600 * 1000 });
	}
}

export async function getCache({ platform, cacheKey }: CacheData) {
	let data;

	if (platform?.context?.durable) {
		data = await platform.context.durable.get(cacheKey);
	} else {
		const cached = inMemoryCache.get(cacheKey);
		if (cached && cached.expiry > Date.now()) {
			data = cached.data;
			console.log('In-memory cache hit!');
		}
	}

	return data;
}
