export async function load({ url }) {
	const fullUrl = `${url.origin}${url.pathname}`;

	return {
		metadata: {
			title: 'About',
			description: 'More about me.',
			url: fullUrl
		}
	};
}
