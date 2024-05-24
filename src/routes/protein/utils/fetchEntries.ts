/**
 * fetch all entries from the server
 */
export async function fetchEntries(date: Date) {
	const updatedEntriesResponse = await fetch(`/api/protein/entries?date=${date.toISOString()}`, {
		method: 'GET'
	});

	if (updatedEntriesResponse.ok) {
		const updatedEntriesData = await updatedEntriesResponse.json();
		return updatedEntriesData.entries; // Update the entries variable with the new data
	}

	return [];
}
