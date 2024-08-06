import { fillProductsInventoryStores, productsInventoryStores } from '$lib/inventory/stores';
import type { LayoutServerLoad } from '../$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	productsInventoryStores.set([]);
	await fillProductsInventoryStores();
	if (locals.session?.userRole == 'admin') {
		return { admin: true };
	}
	return { admin: false };
};
