export const load = async (event) => {
	const context = event?.platform?.context;
	console.log(context); // shows up in your functions log in the Netlify app
};
