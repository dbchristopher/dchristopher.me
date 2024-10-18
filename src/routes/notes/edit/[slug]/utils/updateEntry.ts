export async function updateEntry(id: string, event: Event) {
	const form = event.target as HTMLFormElement;
	const data = new FormData(form);

	try {
		const response = await fetch(`/api/notes/entries/${id}`, {
			method: 'PATCH',
			body: data
		});

		if (!response.ok) {
			throw new Error('Note updating failed');
		}

		form.reset();
	} catch (error) {
		console.error('Error during notes updating:', error);
	}
}
