import { ADMIN_EMAIL } from '$env/static/private';
import { emailAuthToken } from './emailAuthToken';

export async function POST(event) {
	const data = await event.request.formData();
	const emailInput = data.get('email');

	// I already know the email, so treat the emailInput form field as
	// a honeypot and reject the submission
	if (ADMIN_EMAIL && !emailInput) {
		// email Authentication link
		const result = await emailAuthToken();

		// return success
		return new Response(JSON.stringify({ success: true, ...result }), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	return new Response(JSON.stringify({ success: false }), {
		status: 400,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
