import { normalizeTags } from '$lib/normalizeTags';

export async function PATCH({ request, platform }) {
  const data = await request.formData();
	const title = data.get('title');
	const content = data.get('content');
	const tags = normalizeTags(data.get('tags'));
	const status = data.get('status');

  console.log({title, content, tags, status})
}