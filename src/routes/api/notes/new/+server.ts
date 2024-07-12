import { insertNote } from './insertNote';
import {NoteStatus} from '$lib/constants';
import {generateSlugFromTitle} from './generateSlugFromTitle'
import {normalizeTags} from './normalizeTags'


export async function POST(event) {
	const data = await event.request.formData();
	const title = data.get('title');
	const content = data.get('content');
	const tags = normalizeTags(data.get('tags'));
	const status = data.get('status');
  const slug = generateSlugFromTitle(title);

	if (
		typeof title === 'string' &&
		typeof content === 'string' &&
		tags.length &&
		(status === NoteStatus.DRAFT || status === NoteStatus.PUBLISHED)
	) {
		// insert entry token into mongodb protein table
		const dbResult = await insertNote({title, content, tags, status, slug});
		if (dbResult.success) {
			// return success
			return new Response(JSON.stringify({ success: true }), {
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
