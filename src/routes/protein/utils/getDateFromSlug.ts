import { formatDateString } from './formatDateString';

export function getDateFromSlug(slug: string, timezone: string = 'UTC') {
	if (slug === 'today') {
		const today = new Date();
		return formatDateString(new Date(today.toLocaleString('en-US', { timeZone: timezone })));
	}
	return slug;
}
