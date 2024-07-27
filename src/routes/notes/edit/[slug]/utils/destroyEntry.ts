export async function destroyEntry(id: string) {
	try {
		const response = await fetch(`/api/notes/entries/${id}`, {
			method: 'DELETE'
		});

		if (!response.ok) {
			throw new Error('Note deletion failed');
		}
	} catch (error) {
		console.error('Error during note deletion:', error);
	}
}
