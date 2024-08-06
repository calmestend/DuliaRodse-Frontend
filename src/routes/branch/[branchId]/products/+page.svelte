<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AddProduct from '$lib/components/AddProduct.svelte';
	import { branchesStores, productsInventoryStores } from '$lib/inventory/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	const branchId = $page.params.branchId;
</script>

{#if $branchesStores.find((branch) => branch.id === parseInt(branchId) && branch.active)}
	{#each $productsInventoryStores as product}
		{#if product.branchId === parseInt(branchId) && product.active && product.existence > 0}
			<h2>{product.name}</h2>
			<p>Sucursal: {product.branchId}</p>
			<p>Numero de inventario: {product.inventoryId}</p>
			<hr />
			{#if data.authenticated && data.admin === false}
				<AddProduct {product} />
			{/if}
			<button on:click={() => goto(`/branch/${branchId}/products/${product.inventoryId}`)}
				>Ver Mas</button
			>
		{/if}
	{/each}
{:else}
	<h1>Sucursal inexistente o inactiva</h1>
{/if}
