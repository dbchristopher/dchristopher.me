import { ADMIN_EMAIL } from '$env/static/private';
import { emailAuthToken } from './emailAuthToken';
import { generateAuthToken } from './generateAuthToken';
import { insertAuthToken } from './insertAuthToken';

export async function POST(event) {
	const data = await event.request.formData();
	const emailInput = data.get('email');

	// I already know the email, so treat the emailInput form field as
	// a honeypot and reject the submission
	if (ADMIN_EMAIL && !emailInput) {
		const authToken = generateAuthToken(60);

		// email Authentication link
		const result = await emailAuthToken(authToken);

		// insert auth token into mongodb auth table
		const dbResult = await insertAuthToken(authToken);

		if (dbResult.success) {
			// return success
			return new Response(JSON.stringify({ success: true, ...result }), {
				headers: {
					'Content-Type': 'application/json'
				}
			});
		} else {
			// return failure
			return new Response(JSON.stringify(dbResult), {
				status: 500,
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
