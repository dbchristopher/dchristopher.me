import { compact } from '$lib/compact';

export const normalizeTags = (tags: FormDataEntryValue | null): string[] => {
	return compact<string>(String(tags).split(',')).map((s) => s.trim());
};
