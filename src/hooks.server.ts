import { validationSession } from '$lib/auth/validations';
import { SESSION_COOKIE_NAME } from '$lib/constants';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get(SESSION_COOKIE_NAME);

	if (sessionCookie) {
		try {
			const sessionValidationResult = validationSession(sessionCookie);
			event.locals.session = sessionValidationResult.sessionResult;
			event.locals.user = sessionValidationResult.userResult;
		} catch {
			event.cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
			event.locals.session = undefined;
			event.locals.user = undefined;
		}
	} else {
		event.locals.session = undefined;
		event.locals.user = undefined;
	}

	const response = resolve(event);
	return response;
};
