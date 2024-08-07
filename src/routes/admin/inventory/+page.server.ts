import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';
import {
	fillProductsInventoryStores,
	fillProductStores,
	productsInventoryStores,
	productsStores
} from '$lib/inventory/stores';

export const load: PageServerLoad = async () => {
	productsInventoryStores.set([]);
	await fillProductsInventoryStores();
	productsStores.set([]);
	await fillProductStores();
	const currentProductsInventory = get(productsInventoryStores);
	return {
		currentProductsInventory
	};
};
