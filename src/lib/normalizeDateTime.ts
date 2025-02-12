/**
 * A utility function to normalize the timezone of a date object to Pacific Time.
 * Used to keep the timezone consistent between the browser and server.
 * @param date the timezone relative to the browser
 * @returns
 */
export function normalizeDateTime(date: Date): Date {
	const year = date.getUTCFullYear();
	const month = date.getUTCMonth();
	const day = date.getUTCDate();

	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	// Create start of day in UTC
	return new Date(Date.UTC(year, month, day, hours, minutes, seconds, 0));
}
