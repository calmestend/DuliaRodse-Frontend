import { fillProductsInventoryStores } from '$lib/inventory/stores';
import { fillShoppingHistory, shoppingCart, shoppingHistory } from '$lib/shopping/stores';
import type { PaymentServerData, SaleInventoryServerData, SaleServerData } from '$lib/types';
import { get } from 'svelte/store';

export async function createSale(date: string, amount: string, clientId: number) {
	const newSale: SaleServerData = {
		CVE_VENTA: 0,
		FEC_VENTA: date.split('T')[0],
		PAGO_VENTA: amount,
		ID_CLIE: clientId
	};

	const response = await fetch('http://localhost/duliarodse/back/api/venta/create.php', {
		method: 'POST',
		body: JSON.stringify(newSale)
	});

	const parsedResponse = await response.json();

	if (parsedResponse.message === 'Post created') {
		return true;
	}

	return false;
}

export async function createPayment(date: string, amount: string, type: string, saleId: number) {
	const newPayment: PaymentServerData = {
		CVE_PAGO: 0,
		FEC_PAGO: date.split('T')[0],
		CANT_PAGO: amount,
		TIP_PAGO: type === 'paypal' ? 'PAYPAL' : 'TARJETA',
		CVE_VENTA: saleId
	};

	const response = await fetch('http://localhost/duliarodse/back/api/pago/create.php', {
		method: 'POST',
		body: JSON.stringify(newPayment)
	});

	const parsedResponse = await response.json();

	if (parsedResponse.message === 'Post created') {
		return true;
	}

	return false;
}

export async function createSaleInventory(saleId: number, inventoryId: number, quantity: number) {
	const newSaleInventoryItem: SaleInventoryServerData = {
		CVE_VENTA: saleId,
		NO_INV: inventoryId,
		CANT_PRO: quantity
	};

	const response = await fetch('http://localhost/duliarodse/back/api/venta_inventario/create.php', {
		method: 'POST',
		body: JSON.stringify(newSaleInventoryItem)
	});

	const parsedResponse = await response.json();

	if (parsedResponse.message === 'Post created') {
		return true;
	}

	return false;
}

export async function getLastPurchase(clientId: number) {
	const response = await fetch(
		`http://localhost/duliarodse/back/api/venta/search_last_by_client.php?id_clie=${clientId}`
	);
	const parsedResponse = await response.json();
	const lastPurchase: SaleServerData = parsedResponse;

	if (lastPurchase.CVE_VENTA) {
		return lastPurchase;
	}

	return false;
}

export async function processPayment(
	date: string,
	clientId: number,
	type: string,
	amount: string,
	paymentAmount: string
) {
	await createSale(date, amount, clientId);

	const lastPurchase: SaleServerData | false = await getLastPurchase(clientId);
	if (lastPurchase === false) {
		return false;
	}
	const saleId = lastPurchase.CVE_VENTA;

	await createPayment(date, paymentAmount, type, saleId);

	// Push every item bought into the db
	const shoppingCartItems = get(shoppingCart);
	shoppingCartItems.map(async (shoppingCartItem) => {
		await createSaleInventory(saleId, shoppingCartItem.inventoryId, shoppingCartItem.quantity);
	});
	shoppingCart.set([]);
	await fillProductsInventoryStores();
	shoppingHistory.set([]);
	await fillShoppingHistory();
}
