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

export const title = createTitle();
