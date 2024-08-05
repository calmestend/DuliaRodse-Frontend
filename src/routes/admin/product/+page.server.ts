import { fillProductStores, productsStore } from '$lib/inventory/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	productsStore.set([]);
	await fillProductStores();
	const currentProducts = get(productsStore);
	return {
		currentProducts
	};
};
