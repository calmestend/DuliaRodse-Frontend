import { createClient } from '$lib/auth/auth';
import { SESSION_COOKIE_NAME } from '$lib/constants';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = String(formData.get('username'));
		const password = String(formData.get('password'));
		const name = String(formData.get('name'));
		const firstLastname = String(formData.get('firstLastname'));
		const secondLastname = String(formData.get('secondLastname'));
		const email = String(formData.get('email'));
		const phoneNumber = String(formData.get('phoneNumber'));

		const newClient = {
			ID_CLIE: null,
			NI_CLIE: name,
			AP_CLIE: firstLastname,
			AM_CLIE: secondLastname,
			COL_CLIE: undefined,
			CALLE_CLIE: undefined,
			NOINT_CLIE: undefined,
			NOEXT_CLIE: undefined,
			CP_CLIE: undefined,
			EMAIL_CLIE: email,
			ID_USU: null,
			CVE_CIUDAD: undefined,
			RFC_CLIE: undefined,
			TEL_CLIE: phoneNumber
		};

		try {
			const clientCreated = createClient(newClient, username, password);
			cookies.set(SESSION_COOKIE_NAME, (await clientCreated).id, {
				path: '/',
				httpOnly: false
			});
		} catch (error) {
			if (error instanceof Error) {
				return fail(500, {
					username,
					password,
					name,
					firstLastname,
					secondLastname,
					email,
					phoneNumber,
					message: error.message
				});
			} else {
				return fail(500, {
					username,
					password,
					name,
					firstLastname,
					secondLastname,
					email,
					phoneNumber,
					message: 'Error desconocido en el servidor'
				});
			}
		}
		throw redirect(303, '/');
	}
};
