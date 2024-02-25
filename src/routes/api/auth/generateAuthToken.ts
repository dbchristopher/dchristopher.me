import * as crypto from 'crypto';

export function generateAuthToken(length: number): string {
	const buffer = crypto.randomBytes(Math.ceil(length / 2));
	const randomString = buffer.toString('hex').slice(0, length);
	return randomString;
}
