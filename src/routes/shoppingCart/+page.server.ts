import { clientsStores } from '$lib/auth/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.session) {
		throw redirect(303, '/');
	}

	const user = locals.user;
	const clients = get(clientsStores);
	const client = clients.find((client) => client.userId === user?.id);
	return {
		user,
		client
	};
};
