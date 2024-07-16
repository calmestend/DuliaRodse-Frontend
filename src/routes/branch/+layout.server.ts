import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.session?.userRole == 'admin') {
		return { admin: true };
	}
	return { admin: false };
};
