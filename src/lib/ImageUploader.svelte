<script lang="ts">
	import { PUBLIC_CLOUDINARY_CLOUD_NAME } from '$env/static/public';

	interface Props {
		handleImageUpload: (cloudinaryId: string) => void;
	}

	let { handleImageUpload }: Props = $props();

	let uploading = $state(false);
	let errorMessage = $state('');

	async function uploadImage(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (!file) return;

		uploading = true;
		errorMessage = '';

		try {
			// Get signature from server
			const signatureResponse = await fetch('/api/cloudinary-signature', {
				method: 'POST'
			});
			const { signature, timestamp, apiKey } = await signatureResponse.json();

			// Create form data with secure signature
			const formData = new FormData();
			formData.append('file', file);
			formData.append('api_key', apiKey);
			formData.append('timestamp', timestamp.toString());
			formData.append('signature', signature);

			// Upload to Cloudinary
			const uploadResponse = await fetch(
				`https://api.cloudinary.com/v1_1/${PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
				{
					method: 'POST',
					body: formData
				}
			);

			if (!uploadResponse.ok) {
				throw new Error('Upload failed');
			}

			const result = await uploadResponse.json();

			handleImageUpload(result.public_id);
		} catch (error) {
			console.error('Upload error:', error);
			errorMessage = 'Failed to upload image. Please try again.';
		} finally {
			uploading = false;
		}
	}
</script>

<div class="image-uploader">
	<input type="file" accept="image/*" onchange={uploadImage} disabled={uploading} />

	{#if uploading}
		<div class="loading">Uploading image...</div>
	{/if}

	{#if errorMessage}
		<div class="error">{errorMessage}</div>
	{/if}
</div>

<style>
	.image-uploader {
		margin: 1rem 0;
	}

	.loading {
		margin-top: 0.5rem;
		color: #666;
	}

	.error {
		margin-top: 0.5rem;
		color: #e53e3e;
	}
</style>
