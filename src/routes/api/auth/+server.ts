import { ADMIN_EMAIL } from '$env/static/private';

export async function POST(event) {
	const data = await event.request.formData();
	const emailInput = data.get('email');

	if (!ADMIN_EMAIL) {
		// return failure
		return new Response(JSON.stringify({ success: false, message: 'missing ADMIN_EMAIL value' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	// I already know the email, so treat the emailInput form field as
	// a honeypot and reject the submission
	if (ADMIN_EMAIL && !emailInput) {
		// email Authentication link
		console.log('email authentication form');
		console.log('email', ADMIN_EMAIL);
	}

	// return success
	return new Response(JSON.stringify({ success: true }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
