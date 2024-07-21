import type { PageServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.session) {
		throw redirect(303, '/');
	}

	const user = locals.user;
	return {
		user
	};
};
