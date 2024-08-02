<script lang="ts">
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';
	import { addProductToShoppingCart } from '$lib/shopping/stores';
	import type { ProductInventory, Review } from '$lib/types';

	export let data: PageData;
	const currentProduct: ProductInventory = data.currentProduct;
	const currentReviews: Review[] = data.currentReviews;
	console.log(data);
	console.log(currentProduct);
	console.log(currentReviews);
	let quantity = 1;
</script>

<!--TODO: Create component -->
<!--TODO: Add add to cart modal window -->
{#if currentProduct}
	<h2>Nombre: {currentProduct.name}</h2>
	<h2>Numero de inventario: {currentProduct.inventoryId}</h2>
	<h2>Existencia: {currentProduct.existence}</h2>
	{#if data.authenticated}
		<input
			type="number"
			min="1"
			max={currentProduct.existence}
			placeholder="cantidad a agregar"
			bind:value={quantity}
		/>
		<button on:click={() => addProductToShoppingCart(currentProduct, quantity)}
			>Anadir al carrito</button
		>
	{:else}
		<p>Inicia sesion para anadir al carrito</p>
		<button on:click={() => goto('/auth/login')}>Iniciar sesion</button>
	{/if}
	<h2>Resenas del producto</h2>
	{#if currentReviews.length > 0}
		{#each currentReviews as review}
			<p>Estrellas: {review.scaleId}</p>
			<p>Comentario: {review.commentary}</p>
			<hr />
		{/each}
	{:else}
		<p>Aun no contamos con resenas, se el primero en hacerlo uwu</p>
	{/if}
{:else}
	<p>Cargando producto...</p>
{/if}
