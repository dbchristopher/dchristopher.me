import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY, ADMIN_EMAIL, SENDGRID_SENDER } from '$env/static/private';

export function emailAuthToken(authToken: string) {
	sgMail.setApiKey(SENDGRID_API_KEY);
	const msg = {
		to: ADMIN_EMAIL,
		from: SENDGRID_SENDER,
		subject: 'Dchristopher.me Email Authentication Link ' + new Date(),
		text:
			'Authentication token created. Please use the following token to authenticate: ' + authToken,
		html:
			'Authentication token created. Visit the auth page at <a href="https://dchristopher.me/notes/auth?token=' +
			authToken +
			'">dchristopher.me</a> to continue. Auth token: ' +
			authToken
	};

	return sgMail
		.send(msg)
		.then(() => {
			return { message: 'Email sent' };
		})
		.catch((error) => {
			return { error };
		});
}
