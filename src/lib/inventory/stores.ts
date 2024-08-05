import type {
	Branch,
	BranchServerData,
	Product,
	ProductInventory,
	ProductInventoryServerData,
	ProductServerData,
	CategoryServerData,
	Category
} from '$lib/types';
import { writable } from 'svelte/store';

export const branchesStores = writable<Branch[]>([]);
export const productsInventoryStores = writable<ProductInventory[]>([]);
export const productInventoryStore = writable<ProductInventory>();
export const productsStores = writable<Product[]>([]);
export const categoriesStores = writable<Category[]>([]);

fillProductsInventoryStores();
fillCategoriesStores();

export async function fillCategoriesStores() {
	const response = await fetch('http://localhost/duliarodse/back/api/categoria/read.php');
	const parsedResponse = await response.json();

	if (parsedResponse.data) {
		const categories: CategoryServerData[] = parsedResponse.data;
		categories.map((category) => {
			const newCategory: Category = {
				id: category.ID_CAT,
				name: category.NOM_CAT
			};

			categoriesStores.update((previousCategories) => {
				return [...previousCategories, newCategory];
			});
		});
	}
}

export async function fillProductStores() {
	const response = await fetch('http://localhost/duliarodse/back/api/producto/read.php');
	const parsedResponse = await response.json();

	if (parsedResponse.data) {
		const products: ProductServerData[] = parsedResponse.data;
		products.map((product) => {
			const newProduct: Product = {
				id: product.ID_PRO,
				name: product.NOM_PRO,
				grammage: parseFloat(product.GRAM_PRO),
				cost: parseFloat(product.COS_PRO),
				price: parseFloat(product.PREC_PRO),
				img: product.IMG_PRO,
				categoryId: product.ID_CAT,
				scent: product.AROMA_PRO,
				active: product.ACTIVO === 1 ? true : false
			};

			productsStores.update((previousProducts) => {
				return [...previousProducts, newProduct];
			});
		});
	}
}

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
			stateName: branch?.NOM_ESTADO,
			active: branch?.ACTIVO === 1 ? true : false
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
			nameCategory: productInventory?.NOM_CAT,
			scent: productInventory?.AROMA_PRO,
			active: productInventory?.ACTIVO == 1 ? true : false
		};

		productsInventoryStores.update((previousProductsInventory) => {
			return [...previousProductsInventory, newProductInventory];
		});
	});
}
