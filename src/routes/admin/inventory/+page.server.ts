import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';
import { fillProductsInventoryStores, productsInventoryStores } from '$lib/inventory/stores';

export const load: PageServerLoad = async () => {
	productsInventoryStores.set([]);
	await fillProductsInventoryStores();
	const currentProductsInventory = get(productsInventoryStores);
	return {
		currentProductsInventory
	};
};
