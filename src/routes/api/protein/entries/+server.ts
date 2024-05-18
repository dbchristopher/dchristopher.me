import { fetchProteinEntries } from '$lib/fetchProteinEntries';
export async function GET() {
	const options: ResponseInit = {
		status: 200,
		headers: {
			'content-type': 'application/json'
		}
	};

	const body: BodyInit = JSON.stringify({ entries: await fetchProteinEntries() });
	return new Response(body, options);
}
