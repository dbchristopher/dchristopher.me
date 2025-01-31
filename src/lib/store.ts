import { writable } from 'svelte/store';

function createTitle() {
	const { subscribe, set } = writable('');

	return {
		subscribe,
		set: (value: string) => {
			set(`${value} • Daniel Christopher`);
		},
		clear: () => {
			set('Website • Home suffix');
		}
	};
}

function createDescription() {
	const { subscribe, set } = writable('');

	return {
		subscribe,
		set: (value: string) => {
			set(value);
		},
		clear: () => {
			set('');
		}
	};
}

export const title = createTitle();
export const description = createDescription();
