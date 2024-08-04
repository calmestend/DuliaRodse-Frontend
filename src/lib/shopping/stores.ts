import type {
	ProductInventory,
	ProductShoppingCart,
	PurchaseRecord,
	PurchaseRecordServerData
} from '$lib/types';
import { writable } from 'svelte/store';

export const shoppingCart = writable<ProductShoppingCart[]>([]);
export const shoppingHistory = writable<PurchaseRecord[]>([]);
export const clientShoppingHistory = writable<PurchaseRecord[]>([]);

fillShoppingHistory();

export function addProductToShoppingCart(product: ProductInventory, quantity: number) {
	shoppingCart.update((previousProducts) => {
		const existingProduct = previousProducts.find(
			(currentProduct) => currentProduct.inventoryId === product.inventoryId
		);
		if (existingProduct) {
			existingProduct.quantity += quantity;

			return previousProducts;
		} else {
			const newProduct: ProductShoppingCart = { ...product, quantity };

			return [...previousProducts, newProduct];
		}
	});
}
export function removeProductFromShoppingCart(product: ProductShoppingCart) {
	shoppingCart.update((previousProducts) => {
		return previousProducts.filter(
			(currentProduct) => currentProduct.inventoryId !== product.inventoryId
		);
	});
}

export async function fillShoppingHistory() {
	const response = await fetch(
		`http://localhost/duliarodse/back/api/venta/read_shopping_history.php`
	);
	const parsedResponse = await response.json();
	const purchaseRecords: PurchaseRecordServerData[] = parsedResponse.data;

	if (parsedResponse.data) {
		purchaseRecords.map((purchase) => {
			const newPurchaseRecord: PurchaseRecord = {
				saleId: purchase.CVE_VENTA,
				clientId: purchase.ID_CLIE,
				saleDate: purchase.FEC_VENTA,
				inventoryId: purchase.NO_INV,
				productId: purchase.ID_PRO,
				productName: purchase.NOM_PRO,
				productPrice: parseFloat(purchase.PREC_PRO),
				productQuantity: purchase.CANT_PRO,
				amount: parseFloat(purchase.PAGO_VENTA)
			};

			shoppingHistory.update((previousPurchases) => {
				return [...previousPurchases, newPurchaseRecord];
			});
		});
	}
}

export async function fillClientShoppingHistory(id_clie: number) {
	const response = await fetch(
		`http://localhost/duliarodse/back/api/venta/read_shopping_history_by_client.php?id_clie=${id_clie}`
	);

	const parsedResponse = await response.json();
	const purchaseRecords: PurchaseRecordServerData[] = parsedResponse.data;

	if (parsedResponse.data) {
		purchaseRecords.map((purchase) => {
			const newPurchaseRecord: PurchaseRecord = {
				saleId: purchase.CVE_VENTA,
				clientId: purchase.ID_CLIE,
				saleDate: purchase.FEC_VENTA,
				inventoryId: purchase.NO_INV,
				productId: purchase.ID_PRO,
				productName: purchase.NOM_PRO,
				productPrice: parseFloat(purchase.PREC_PRO),
				productQuantity: purchase.CANT_PRO,
				amount: parseFloat(purchase.PAGO_VENTA)
			};

			clientShoppingHistory.update((previousPurchases) => {
				return [...previousPurchases, newPurchaseRecord];
			});
		});
	}
}
