import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch }) => {
	const result = await fetch('/api/validate-user');
	const parsedResult = await result.json();

	const { authenticated } = parsedResult;

	if (authenticated !== undefined && authenticated === true) {
		return { authenticated: authenticated };
	}

	return { authenticated: false };
};
