import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import { start_mongo } from '$db/mongo';

Sentry.init({
	dsn: 'https://02adb50bb97c86c468369f51dc538c7d@o4507431440678912.ingest.us.sentry.io/4507431442251776',
	tracesSampleRate: 1
});

start_mongo()
	.then(() => {
		console.log('MongoDB connected');
	})
	.catch((err) => {
		console.error('MongoDB connection error:', err);
	});

export const handleError = Sentry.handleErrorWithSentry();
export const handle = sequence(Sentry.sentryHandle());
