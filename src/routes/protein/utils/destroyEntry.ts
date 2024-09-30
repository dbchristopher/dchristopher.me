export async function destroyEntry(id: string, date: Date, onSuccess: () => void) {
	const deleteEntryResponse = await fetch(`/api/protein/entries/${id}?date=${date}`, {
		method: 'DELETE'
	});

	if (deleteEntryResponse.status === 200) {
		onSuccess();
	} else {
		console.error('Error deleting entry');
	}
}
