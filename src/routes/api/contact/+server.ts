import { ADMIN_EMAIL } from '$env/static/private';

import { sendEmail } from './sendEmail';

export async function POST(event) {
	const data = await event.request.formData();
	const usercode = data.get('usercode');

	// I already know the email, so treat the emailInput form field as
	// a honeypot and reject the submission
	if (ADMIN_EMAIL && !usercode) {
		const email = data.get('email');
		const message = data.get('message');

		if (typeof email === 'string' && typeof message === 'string') {
			const result = sendEmail({ email, message });
			return new Response(JSON.stringify({ success: true, ...result }), {
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	}

	return new Response(JSON.stringify({ success: false }), {
		status: 500,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
