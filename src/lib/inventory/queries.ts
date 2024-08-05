import type { Product, ProductServerData } from '$lib/types';

export async function updateProduct(product: Product) {
	const productUpdated: ProductServerData = {
		ID_PRO: product.id,
		NOM_PRO: product.name,
		GRAM_PRO: product.grammage + '',
		COS_PRO: product.cost + '',
		PREC_PRO: product.price + '',
		IMG_PRO: product.img,
		ID_CAT: product.categorieId,
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
