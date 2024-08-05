import { fillProductStores, productsStores } from '$lib/inventory/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	productsStores.set([]);
	await fillProductStores();
	const currentProducts = get(productsStores);
	return {
		currentProducts
	};
};
