import { formatDateString } from './formatDateString';

export function getDateFromSlug(slug: string) {
	if (slug === 'today') {
		return formatDateString(new Date());
	}
	return slug;
}
