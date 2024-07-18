<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { productsInventoryStores } from '$lib/inventory/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	const branchId = $page.params.branchId;
</script>

{#each $productsInventoryStores as product}
	{#if product.branchId === parseInt(branchId) && product.active && product.existence > 0}
		<h2>{product.name}</h2>
		<p>Sucursal: {product.branchId}</p>
		<p>Numero de inventario: {product.inventoryId}</p>
		<hr />
		{#if data.authenticated && data.admin === false}
			<button>Agregar al Carrito</button>
		{/if}
		<button on:click={() => goto(`/branch/${branchId}/products/${product.inventoryId}`)}
			>Ver Mas</button
		>
	{/if}
{/each}
