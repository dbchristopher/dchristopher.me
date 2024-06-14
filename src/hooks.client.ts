import * as Sentry from '@sentry/sveltekit';

// If you don't want to use Session Replay, remove the `Replay` integration,
// `replaysSessionSampleRate` and `replaysOnErrorSampleRate` options.
Sentry.init({
	dsn: 'https://02adb50bb97c86c468369f51dc538c7d@o4507431440678912.ingest.us.sentry.io/4507431442251776',
	tracesSampleRate: 1,
	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
	integrations: [Sentry.replayIntegration()]
});

export const handleError = Sentry.handleErrorWithSentry();
