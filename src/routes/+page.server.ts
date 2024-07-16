import { signOut } from '$lib/auth/auth';
import { SESSION_COOKIE_NAME } from '$lib/constants';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	logout: async ({ cookies }) => {
		const sessionId = cookies.get(SESSION_COOKIE_NAME);

		if (!sessionId) return {};

		try {
			signOut(sessionId);
			cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
		} catch (error) {
			if (error instanceof Error) {
				return { message: error.message };
			}
		}

		return {};
	}
};
