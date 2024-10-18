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

export type InsertAuthTokenResponse =
	| { success: true; error?: never }
	| { success: false; error: Error };

export type InsertNoteArgs = {
	title: string;
	content: string;
	tags: string[];
	status: NoteStatus;
	slug: string;
};
