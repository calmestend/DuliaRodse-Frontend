<script lang="ts">
	import { page } from '$app/stores';
	import { productsInventoryStores } from '$lib/inventory/stores';
	import type { ProductInventory } from '$lib/types';
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';
	import { addProductToShoppingCart } from '$lib/shopping/stores';

	const productInventoryId = $page.params.productInventoryId;

	let currentProduct: ProductInventory | undefined = $productsInventoryStores.find(
		(productInventory) =>
			productInventory.inventoryId === parseInt(productInventoryId) &&
			productInventory.existence > 0 &&
			productInventory.active
	);

	export let data: PageData;
	let quantity = 1;
</script>

<!--TODO: Create component -->
<!--TODO: Add add to cart modal window -->
{#if currentProduct}
	<h2>Nombre: {currentProduct.name}</h2>
	<h2>Numero de inventario: {currentProduct.inventoryId}</h2>
	<h2>Existencia: {currentProduct.existence}</h2>
	{#if data.authenticated}
		<input type="number" placeholder="cantidad a agregar" bind:value={quantity} />
		<button on:click={() => addProductToShoppingCart(currentProduct, quantity)}
			>Anadir al carrito</button
		>
	{:else}
		<p>Inicia sesion para anadir al carrito</p>
		<button on:click={() => goto('/auth/login')}>Iniciar sesion</button>
	{/if}
{:else}
	<p>Cargando producto...</p>
{/if}
