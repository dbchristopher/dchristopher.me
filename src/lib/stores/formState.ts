import { writable, get } from 'svelte/store';

/* 
  create a centralized state to track when a form has unsaved changes.
  subscribe to the formState to render the `unsaved changes` warning 
  if user closes the page.
*/
export const formState = writable<Record<string, string>>({});

export const defaultFormState = writable<Record<string, string>>({});

export const updateFormState = ([key, val]: [string, string]) => {
	formState.update((form) => {
		return { ...form, [key]: val };
	});
};

export function setDefaultFormState<T extends string>(state: Record<T, string>) {
	defaultFormState.set(state);
}

export const resetFormState = () => {
	formState.set(get(defaultFormState));
};
