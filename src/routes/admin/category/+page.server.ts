import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';
import { categoriesStores, fillCategoriesStores } from '$lib/inventory/stores';

export const load: PageServerLoad = async () => {
	categoriesStores.set([]);
	await fillCategoriesStores();
	const currentCategories = get(categoriesStores);
	return {
		currentCategories
	};
};
