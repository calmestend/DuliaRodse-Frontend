import { validationSession } from '$lib/auth/validations';
import { SESSION_COOKIE_NAME } from '$lib/constants';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionCookie = cookies.get(SESSION_COOKIE_NAME);

	if (sessionCookie) {
		try {
			const user = validationSession(sessionCookie).userResult;
			return json({ authenticated: true, user });
		} catch {
			cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
			return json({ authenticated: false });
		}
	} else {
		return json({ authenticated: false });
	}
};
