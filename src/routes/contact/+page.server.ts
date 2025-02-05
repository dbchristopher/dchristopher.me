export async function load({ url }) {
	const fullUrl = `${url.origin}${url.pathname}`;

	return {
		metadata: {
			title: 'Contact',
			description: 'Tell me something good.',
			url: fullUrl
		}
	};
}
