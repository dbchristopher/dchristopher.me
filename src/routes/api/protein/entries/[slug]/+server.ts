import { ObjectId } from 'mongodb';
import { protein } from '$db/protein';
import { invalidateCache } from '$lib/cacheUtils';
import { PROTEIN_CACHE_KEY } from '$lib/constants';

export async function DELETE({params, platform}) {
	const entryId = params.slug;

	try {
		await invalidateCache({ platform, cacheKey: PROTEIN_CACHE_KEY });

		const result = await protein.deleteOne({ _id: new ObjectId(entryId) });

		if (result.deletedCount === 0) {
			const options: ResponseInit = {
				status: 404
			};
			const responseBody: BodyInit = JSON.stringify({ message: 'Entry not found' });
			return new Response(responseBody, options);
		}

		const options: ResponseInit = {
			status: 200
		};
		const responseBody: BodyInit = JSON.stringify({ ok: true });

		return new Response(responseBody, options);
	} catch (error) {
		console.error('Error deleting entry:', error);
		const options: ResponseInit = {
			status: 500
		};
		const responseBody: BodyInit = JSON.stringify({ message: (error as Error).message });

		return new Response(responseBody, options);
	}
}
