export async function insertEntry(event: Event, onSuccess: () => void) {
	const form = event.target as HTMLFormElement;
	const data = new FormData(form);

	try {
		const response = await fetch('/api/protein', {
			method: 'POST',
			body: data
		});

		if (!response.ok) {
			throw new Error('Protein log failed');
		}

		form.reset();

		onSuccess();
	} catch (error) {
		console.error('Error during protein insertion:', error);
	}
}
