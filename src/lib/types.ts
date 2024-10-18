import { NoteStatus } from '$lib/constants';

export type Note = {
	_id: string;
	title: string;
	tags: string[];
	content: string;
	created: string;
	slug: string;
	status: NoteStatus;
};

