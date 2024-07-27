import { blog } from '$db/blog';
import type { PageServerLoad } from './$types';
import { NoteStatus } from '$lib/constants';

type Note = {
	_id: string;
	title: string;
	tags: string[];
	content: string;
	created: string;
	slug: string;
	status: NoteStatus;
};

export const load: PageServerLoad = async ({ params, parent }) => {
	try {
		const { isUserAuthenticated } = await parent();

		const { title, tags, content, created, slug, status, _id } = (
			await blog.find({ slug: params.slug }).limit(1).toArray()
		)[0];

		const webSafeNote: Note = { title, tags, content, created, slug, status, _id: _id.toString() };

		return { post: webSafeNote, isUserAuthenticated };
	} catch (error) {
		return { props: { customers: [] } };
	}
};
