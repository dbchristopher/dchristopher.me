export function getDateFromSlug(slug: string) {
	if (slug === 'today') {
		return getTodayFormatted();
	}
	return slug;
}

function getTodayFormatted(): string {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-indexed
	const day = String(today.getDate()).padStart(2, '0');

	return `${year}/${month}/${day}`;
}
