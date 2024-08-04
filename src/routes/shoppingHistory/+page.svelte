<script lang="ts">
	import type { PageData } from './$types';
	import { clientShoppingHistory, fillClientShoppingHistory } from '$lib/shopping/stores';
	import type { PurchaseRecord } from '$lib/types';
	import BranchSelection from '$lib/components/BranchSelection.svelte';
	import { onMount } from 'svelte';

	export let data: PageData;

	let purchasesBySaleId: Record<number, PurchaseRecord[]>;
	const reviews = data.currentReviews;

	onMount(async () => {
		clientShoppingHistory.set([]);
		if (data.client) {
			await fillClientShoppingHistory(data.client.id);
			purchasesBySaleId = $clientShoppingHistory.reduce(
				(grouped, purchase) => {
					grouped[purchase.saleId] = grouped[purchase.saleId] || [];
					grouped[purchase.saleId].push(purchase);
					return grouped;
				},
				{} as Record<number, PurchaseRecord[]>
			);
		}
	});
</script>

<!--TODO: Merge into one table if have the same purchase id-->
<h1>Historial de compras</h1>
{#if purchasesBySaleId && Object.keys(purchasesBySaleId).length > 0}
	{#each Object.entries(purchasesBySaleId) as [saleId, purchases]}
		<h2>Venta ID: {saleId}</h2>
		<h3>Fecha: {purchases[0].saleDate}</h3>
		{#each purchases as purchase}
			<p>Nombre del producto: {purchase.productName}</p>
			<p>Precio del producto: {purchase.productPrice}</p>
			<p>Cantidad: {purchase.productQuantity}</p>
			<p>Numero de inventario: {purchase.inventoryId}</p>
			{#if reviews.find((review) => review.productId === purchase.productId)}
				<button>Modificar reseña</button>
			{:else}
				<button>Agregar reseña</button>
			{/if}
		{/each}
	{/each}
{:else}
	<p>No cuentas con compras realizadas aun :c</p>
	<p>Empieza tu primer compra c:</p>
	<BranchSelection message="Ver Productos" />
{/if}
