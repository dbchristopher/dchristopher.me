import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY, ADMIN_EMAIL, SENDGRID_SENDER } from '$env/static/private';

type EmailProps = {
	email: string;
	message: string;
};

export async function sendEmail({ email, message }: EmailProps) {
	if (email.length && message.length) {
		sgMail.setApiKey(SENDGRID_API_KEY);
		const msg = {
			to: ADMIN_EMAIL,
			from: SENDGRID_SENDER,
			subject: 'New message from Dchristopher.me contact form! ' + new Date(),
			text: 'from: ' + email + '\n\n' + message,
			html: '<p><b>From:</b> ' + email + '</p><p>' + '<b>Message:</b> ' + message + '</p>'
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

	return { message: 'please include your email and message' };
}
