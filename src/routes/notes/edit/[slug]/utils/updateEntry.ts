export async function insertEntry(event: Event) {
	const form = event.target as HTMLFormElement;
	const data = new FormData(form);

	try {
		const response = await fetch('/api/notes/new', {
			method: 'POST',
			body: data
		});

		if (!response.ok) {
			throw new Error('Note insertion failed');
		}

		form.reset();
	} catch (error) {
		console.error('Error during notes insertion:', error);
	}
}
