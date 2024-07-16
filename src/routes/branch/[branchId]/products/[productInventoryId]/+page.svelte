<script lang="ts">
	import { page } from '$app/stores';
	import { productsInventoryStores } from '$lib/inventory/stores';
	import type { ProductInventory } from '$lib/types';
	import { get } from 'svelte/store';
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';
	const productInventoryId = $page.params.productInventoryId;
	const productsInventory: ProductInventory[] = get(productsInventoryStores);
	let currentProduct: ProductInventory | undefined = productsInventory.find(
		(productInventory) =>
			productInventory.inventoryId === parseInt(productInventoryId) &&
			productInventory.existence > 0 &&
			productInventory.active
	);

	export let data: PageData;
</script>

<!--TODO: Create component -->
<!--TODO: Add add to cart modal window -->
{#if currentProduct}
	<h2>Nombre: {currentProduct.name}</h2>
	<h2>Numero de inventario: {currentProduct.inventoryId}</h2>
	<h2>Existencia: {currentProduct.existence}</h2>
	{#if data.authenticated}
		<button>Anadir al carrito</button>
	{:else}
		<p>Inicia sesion para anadir al carrito</p>
		<button on:click={() => goto('/auth/login')}>Iniciar sesion</button>
	{/if}
{:else}
	<p>Cargando producto...</p>
{/if}
