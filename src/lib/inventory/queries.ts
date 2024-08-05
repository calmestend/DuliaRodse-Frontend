import type { CategoryServerData, Category, Product, ProductServerData } from '$lib/types';

export async function createCategory(category: Category) {
	const newCategory: CategoryServerData = {
		ID_CAT: category.id,
		NOM_CAT: category.name
	};

	const response = await fetch('http://localhost/duliarodse/back/api/categoria/create.php', {
		method: 'POST',
		body: JSON.stringify(newCategory)
	});

	const parsedResponse = await response.json();
	if (parsedResponse.message === 'Post created') {
		location.reload();
	}
	location.reload();
}

export async function updateCategory(category: Category) {
	const categoryUpdated: CategoryServerData = {
		ID_CAT: category.id,
		NOM_CAT: category.name
	};

	const response = await fetch('http://localhost/duliarodse/back/api/categoria/update.php', {
		method: 'POST',
		body: JSON.stringify(categoryUpdated)
	});

	const parsedResponse = await response.json();
	if (parsedResponse.message === 'Post created') {
		location.reload();
	}
	location.reload();
}

export async function createProduct(product: Product) {
	const newProduct: ProductServerData = {
		ID_PRO: product.id,
		NOM_PRO: product.name,
		GRAM_PRO: product.grammage + '',
		COS_PRO: product.cost + '',
		PREC_PRO: product.price + '',
		IMG_PRO: product.img,
		ID_CAT: product.categoryId,
		AROMA_PRO: product.scent,
		ACTIVO: product.active ? 1 : 0
	};

	const response = await fetch('http://localhost/duliarodse/back/api/producto/create.php', {
		method: 'POST',
		body: JSON.stringify(newProduct)
	});

	const parsedResponse = await response.json();
	if (parsedResponse.message === 'Post created') {
		location.reload();
	}
	location.reload();
}

export async function updateProduct(product: Product) {
	const productUpdated: ProductServerData = {
		ID_PRO: product.id,
		NOM_PRO: product.name,
		GRAM_PRO: product.grammage + '',
		COS_PRO: product.cost + '',
		PREC_PRO: product.price + '',
		IMG_PRO: product.img,
		ID_CAT: product.categoryId,
		AROMA_PRO: product.scent,
		ACTIVO: product.active ? 1 : 0
	};
	const response = await fetch('http://localhost/duliarodse/back/api/producto/update.php', {
		method: 'POST',
		body: JSON.stringify(productUpdated)
	});

	const parsedResponse = await response.json();
	if (parsedResponse.message === 'Post created') {
		location.reload();
	}
	location.reload();
}

export async function enableProduct(id: number) {
	const product = { ID_PRO: id };

	const response = await fetch('http://localhost/duliarodse/back/api/producto/enable.php', {
		method: 'POST',
		body: JSON.stringify(product)
	});

	const parsedResponse = await response.json();
	if (parsedResponse.message === 'Post created') {
		location.reload();
	}
	location.reload();
}

export async function disableProduct(id: number) {
	const product = { ID_PRO: id };

	const response = await fetch('http://localhost/duliarodse/back/api/producto/delete.php', {
		method: 'POST',
		body: JSON.stringify(product)
	});

	const parsedResponse = await response.json();
	if (parsedResponse.message === 'Post created') {
		location.reload();
	}
	location.reload();
}
