import type { ProductInventory, ProductShoppingCart } from '$lib/types';
import { writable } from 'svelte/store';

export const shoppingCart = writable<ProductShoppingCart[]>([]);

shoppingCart.subscribe(console.log);

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
