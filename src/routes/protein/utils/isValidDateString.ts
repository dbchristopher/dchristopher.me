export function isValidDateString(dateStr: string): boolean {
	// Check basic format using regex
	if (!/^\d{4}\/\d{2}\/\d{2}$/.test(dateStr)) {
		return false;
	}

	// Parse the date parts
	const [year, month, day] = dateStr.split('/').map(Number);

	// Create a Date object and verify the parts match
	// Note: JavaScript months are 0-based, so subtract 1 from month
	const date = new Date(year, month - 1, day);

	return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}
