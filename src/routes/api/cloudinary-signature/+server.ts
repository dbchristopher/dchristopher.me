// src/routes/api/cloudinary-signature/+server.ts
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '$env/static/private';
import { PUBLIC_CLOUDINARY_CLOUD_NAME } from '$env/static/public';
import { json } from '@sveltejs/kit';
import crypto from 'crypto';

export async function POST() {
	// Generate timestamp
	const timestamp = Math.round(new Date().getTime() / 1000);

	// Create signature
	const signature = crypto
		.createHash('sha1')
		.update(`timestamp=${timestamp}${CLOUDINARY_API_SECRET}`)
		.digest('hex');

	// Return data needed for secure uploads
	return json({
		signature,
		timestamp,
		apiKey: CLOUDINARY_API_KEY,
		cloudName: PUBLIC_CLOUDINARY_CLOUD_NAME
	});
}
