function pacificTimeOffset(): number {
	// Determine if daylight saving time is in effect
	const isDST = new Date().getTimezoneOffset() < 480;

	// Pacific Time offset (7 hours for DST, 8 hours otherwise)
	const pacificTimeOffset = isDST ? 7 : 8;

	return pacificTimeOffset;
}

/**
 * A utility function to normalize the timezone of a date object to Pacific Time.
 * Used to keep the timezone consistent between the browser and server.
 * @param date the timezone relative to the browser
 * @returns
 */
export function normalizeDateTime(date: Date): Date {
	const now = new Date(date);

	// Adjust the date to Pacific Time
	now.setHours(now.getHours() - pacificTimeOffset());

	return new Date(
		Date.UTC(
			now.getUTCFullYear(),
			now.getUTCMonth(),
			now.getUTCDate(),
			now.getUTCHours(),
			now.getUTCMinutes(),
			now.getUTCSeconds()
		)
	);
}
