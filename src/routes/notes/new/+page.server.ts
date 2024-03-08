export async function load({ parent }) {
	const { isUserAuthenticated } = await parent();

	return {
		isUserAuthenticated
	};
}
