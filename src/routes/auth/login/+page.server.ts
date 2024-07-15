import { createSessionByUsername } from '$lib/auth/auth';
import { SESSION_COOKIE_NAME } from '$lib/constants';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = String(formData.get('username'));
		const password = String(formData.get('password'));

		try {
			const loginResult = createSessionByUsername(username, password);
			cookies.set(SESSION_COOKIE_NAME, (await loginResult).id, {
				path: '/',
				httpOnly: false
			});
		} catch (error) {
			if (error instanceof Error) {
				return fail(500, {
					username,
					password,
					message: error.message
				});
			} else {
				return fail(500, {
					username,
					password,
					message: 'Error desconocido en el servidor'
				});
			}
		}
		throw redirect(303, '/');
	}
};
