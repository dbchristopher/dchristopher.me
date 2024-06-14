import { fetchProteinEntries } from './fetchProteinEntries';

export async function GET(request: Request) {
	const url = new URL(request.url);
	const queryParams = new URLSearchParams(url.search);
	const dateString = queryParams.get('date');

	if (dateString) {
		const date = new Date(dateString);

		const options: ResponseInit = {
			status: 200,
			headers: {
				'content-type': 'application/json'
			}
		};

		const responseBody: BodyInit = JSON.stringify({ entries: await fetchProteinEntries(date) });
		return new Response(responseBody, options);
	}

	return new Response(null, { status: 400 });
}
