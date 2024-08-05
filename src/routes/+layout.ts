import { clearLocalStorage, recoverShoppingCart } from '$lib/auth/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const result = await fetch('/api/validate-user');
	const parsedResult = await result.json();

	const { authenticated, user } = parsedResult;

	if (authenticated !== undefined && authenticated === true) {
		recoverShoppingCart();
		return {
			authenticated,
			user
		};
	}

	clearLocalStorage();
	return { authenticated: false };
};
