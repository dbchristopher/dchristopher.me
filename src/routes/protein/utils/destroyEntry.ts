export async function destroyEntry(id: string, onSuccess: () => void) {
	const deleteEntryResponse = await fetch(`/api/protein/entries/${id}`, {
		method: 'DELETE'
	});

	if (deleteEntryResponse.status === 200) {
		onSuccess();
	} else {
		console.error('Error deleting entry');
	}
}
