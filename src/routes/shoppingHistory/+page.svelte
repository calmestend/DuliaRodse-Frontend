<script lang="ts">
	import type { PageData } from './$types';
	import { clientShoppingHistory, fillClientShoppingHistory } from '$lib/shopping/stores';
	import type { PurchaseRecord } from '$lib/types';
	import BranchSelection from '$lib/components/BranchSelection.svelte';
	import { onMount } from 'svelte';
	import AddReview from '$lib/components/AddReview.svelte';
	import UpdateReview from '$lib/components/UpdateReview.svelte';

	export let data: PageData;

	let purchasesBySaleId: Record<number, PurchaseRecord[]>;
	const reviews = data.currentReviews;
	const currentReview = (purchase: PurchaseRecord) =>
		reviews.find((review) => review.productId === purchase.productId);

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

<h1>Historial de compras</h1>
{#if purchasesBySaleId && Object.keys(purchasesBySaleId).length > 0}
	{#each Object.entries(purchasesBySaleId).reverse() as [saleId, purchases]}
		<div class="sale-container">
			<h2>Venta ID: {saleId}</h2>
			<h3>Fecha: {purchases[0].saleDate}</h3>
			{#each purchases as purchase}
				<div class="purchase-card">
					<p><strong>Nombre del producto:</strong> {purchase.productName}</p>
					<p><strong>Precio del producto:</strong> ${purchase.productPrice}</p>
					<p><strong>Cantidad:</strong> {purchase.productQuantity}</p>
					<p><strong>Numero de inventario:</strong> {purchase.inventoryId}</p>
					{#if currentReview(purchase)}
						<UpdateReview
							id_rev={currentReview(purchase)?.id ?? 0}
							id_clie={data.client?.id ?? 0}
							id_esc={currentReview(purchase)?.scaleId ?? 0}
							com_rev={currentReview(purchase)?.commentary ?? ''}
						/>
					{:else}
						<AddReview id_pro={purchase.productId} id_clie={data.client?.id ?? 0} />
					{/if}
				</div>
			{/each}
		</div>
	{/each}
{:else}
	<p>No cuentas con compras realizadas aun :c</p>
	<p>Empieza tu primer compra c:</p>
	<BranchSelection message="Ver Productos" />
{/if}

<style lang="scss">
	/* Paleta de colores */
	$primary-color: #1e1e1e; /* Color de texto y detalles */
	$background-color: #ffffff; /* Fondo blanco para el contenido */
	$accent-color: #f0f8ff; /* Color de acento para detalles y botones */

	h1 {
		color: $primary-color;
		text-align: center;
		margin-bottom: 2rem;
		font-size: 2.5rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.sale-container {
		margin-bottom: 2rem;
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
	}

	h2 {
		color: $primary-color;
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	h3 {
		color: $primary-color;
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	.purchase-card {
		padding: 1rem;
		margin-bottom: 1rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
	}

	.purchase-card p {
		margin: 0.5rem 0;
		font-size: 1rem;
		color: $primary-color;
	}

	.purchase-card strong {
		color: $primary-color;
	}
</style>
