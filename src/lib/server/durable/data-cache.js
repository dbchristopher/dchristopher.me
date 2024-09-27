export class DataCache {
	constructor(state, env) {
		this.state = state;
	}

	async fetch(request) {
		return new Response('Durable Object is working!');
	}
}
