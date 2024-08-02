import { productsInventoryStores } from '$lib/inventory/stores';
import { fillProductReviews, productReviews } from '$lib/review/stores';
import { get } from 'svelte/store';
import type { PageServerLoad } from './$types';
import type { ProductInventory, Review } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
	const productInventoryId = params.productInventoryId;
	const currentBranchId = params.branchId;

	const products = get(productsInventoryStores);
	const currentProduct: ProductInventory | undefined = products.find(
		(productInventory) =>
			productInventory.inventoryId === parseInt(productInventoryId) &&
			productInventory.existence > 0 &&
			productInventory.active &&
			productInventory.branchId === parseInt(currentBranchId)
	);

	productReviews.set([]);

	if (currentProduct) {
		await fillProductReviews(currentProduct.id);
	}

	const currentReviews: Review[] = get(productReviews);

	return {
		currentProduct: currentProduct,
		currentReviews: currentReviews
	};
};
