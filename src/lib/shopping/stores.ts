import type { ProductShoppingCart } from '$lib/types';
import { writable } from 'svelte/store';

export const shoppingCart = writable<ProductShoppingCart[]>();

export function addProductToShoppingCart(inventoryId: number, quantity: number) {
	shoppingCart.update((previousProducts) => {
		const existingProduct = previousProducts.find((product) => product.inventoryId === inventoryId);
		if (existingProduct) {
			existingProduct.quantity += quantity;

			return previousProducts;
		} else {
			const newProduct: ProductShoppingCart = {
				quantity: quantity,
				inventoryId: inventoryId
			};

			return [...previousProducts, newProduct];
		}
	});
}
export function removeProductFromShoppingCart(inventoryId: number) {
	shoppingCart.update((previousProducts) => {
		return previousProducts.filter((product) => product.inventoryId !== inventoryId);
	});
}

export function updateProductQuantity(inventoryId: number, newQuantity: number) {
	shoppingCart.update((previousProducts) => {
		const existingProduct = previousProducts.find((product) => product.inventoryId === inventoryId);

		if (existingProduct) {
			existingProduct.quantity = newQuantity;
			return previousProducts;
		} else {
			return previousProducts;
		}
	});
}
