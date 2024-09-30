import { normalizeDateTime } from '$lib/normalizeDateTime';
import { PROTEIN_CACHE_KEY } from '$lib/constants';

export function formatDateKeywordCacheKey(date: Date) {
	const normalizedDate = normalizeDateTime(date);
	return `${PROTEIN_CACHE_KEY}-${normalizedDate.toISOString()}`;
}
