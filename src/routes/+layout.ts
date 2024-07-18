import { clearLocalStorage, recoverShoppingCart } from '$lib/auth/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const result = await fetch('/api/validate-user');
	const parsedResult = await result.json();

	const { authenticated } = parsedResult;

	if (authenticated !== undefined && authenticated === true) {
		recoverShoppingCart();
		return { authenticated: authenticated };
	}

	clearLocalStorage();
	return { authenticated: false };
};
