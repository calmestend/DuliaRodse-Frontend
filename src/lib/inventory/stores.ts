import type {
	Branch,
	BranchServerData,
	ProductInventory,
	ProductInventoryServerData
} from '$lib/types';
import { writable } from 'svelte/store';

export const branchesStores = writable<Branch[]>([]);
export const productsInventoryStores = writable<ProductInventory[]>([]);
export const productInventoryStore = writable<ProductInventory>();

fillProductsInventoryStores();

export async function fillBranchesStores() {
	const response = await fetch('http://localhost/duliarodse/back/api/sucursal/read.php');
	const parsedResponse = await response.json();

	const branches: BranchServerData[] = parsedResponse.data;
	branches.map((branch) => {
		const newBranch: Branch = {
			id: branch?.NO_SUC,
			neighborhood: branch?.COL_SUC,
			street: branch?.CALLE_SUC,
			intNumber: branch?.NOINT_SUC,
			extNumber: branch?.NOEXT_SUC,
			zipCode: branch?.CP_SUC,
			cityName: branch?.NOM_CIUDAD,
			stateName: branch?.NOM_ESTADO
		};

		branchesStores.update((previousBranches) => {
			return [...previousBranches, newBranch];
		});
	});
}

export async function fillProductsInventoryStores() {
	const response = await fetch(
		'http://localhost/duliarodse/back/api/producto/read_with_inventory.php'
	);
	const parsedResponse = await response.json();

	const productsInventory: ProductInventoryServerData[] = parsedResponse.data;
	productsInventory.map((productInventory) => {
		const newProductInventory: ProductInventory = {
			branchId: productInventory?.NO_SUC,
			inventoryId: productInventory?.NO_INV,
			existence: parseInt(productInventory?.EXIST_INV),
			id: productInventory?.ID_PRO,
			name: productInventory?.NOM_PRO,
			grammage: parseFloat(productInventory?.GRAM_PRO),
			cost: parseFloat(productInventory?.COS_PRO),
			price: parseFloat(productInventory?.PREC_PRO),
			img: productInventory?.IMG_PRO,
			nameCategorie: productInventory?.NOM_CAT,
			scent: productInventory?.AROMA_PRO,
			active: productInventory?.ACTIVO == 1 ? true : false
		};

		productsInventoryStores.update((previousProductsInventory) => {
			return [...previousProductsInventory, newProductInventory];
		});
	});
}
