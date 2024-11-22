/// <reference types="@material/web/select/select.js" />
/// <reference types="@material/web/button/button.js" />
/// <reference types="@material/web/fab/fab.js" />
/// <reference types="@material/web/iconbutton/icon-button.js" />
/// <reference types="@material/web/icon/icon.js" />

// Add other components you plan to use

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
			errorId: string;
		}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
