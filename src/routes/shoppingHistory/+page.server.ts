import { clientsStores } from '$lib/auth/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from '../$types';
import { redirect } from '@sveltejs/kit';
import { clientReviews, fillClientReviews } from '$lib/review/stores';
import type { Review } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) {
		throw redirect(303, '/');
	}

	const user = locals.user;
	const clients = get(clientsStores);
	const client = clients.find((client) => client.userId === user?.id);

	clientReviews.set([]);

	if (client) {
		await fillClientReviews(client?.id);
	}

	const currentReviews: Review[] = get(clientReviews);

	return {
		user,
		client,
		currentReviews
	};
};
