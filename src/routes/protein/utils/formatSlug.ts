import { formatDate } from './formatDate';

export function formatSlug(date: Date = new Date()): string {
	return `/protein/total-consumption_${formatDate(date)}`;
}
