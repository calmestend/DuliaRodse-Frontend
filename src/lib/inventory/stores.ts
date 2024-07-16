import type { Branch, ProductInventory } from '$lib/types';
import { writable } from 'svelte/store';

export const branchesStores = writable<Branch[]>([]);
export const productsInventoryStores = writable<ProductInventory[]>([]);

fillBranchesStores();
fillProductsInventoryStores();

export async function fillBranchesStores() {}

export async function fillProductsInventoryStores() {}
