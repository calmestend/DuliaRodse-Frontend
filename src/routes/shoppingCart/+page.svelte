<script lang="ts">
	import { removeProductFromShoppingCart, shoppingCart } from '$lib/shopping/stores';
	import type { PageData } from '../$types';
	import BranchSelection from '$lib/components/BranchSelection.svelte';
	import RequestClientData from '$lib/components/RequestClientData.svelte';
	import type { Client, ProductShoppingCart } from '$lib/types';

	export let data: PageData;

	const client: Client = data.client;

	function validateQuantity(product: ProductShoppingCart, quantity: number) {
		if (quantity > product.existence) {
			return product.existence;
		} else if (quantity < 1) {
			return 1;
		}
		return quantity;
	}
</script>

{#if $shoppingCart}
	{#each $shoppingCart as product}
		<p>Nombre: {product.name},</p>
		<p>Precio: {product.price},</p>
		<label for="quantity">Cantidad</label>
		<input
			type="number"
			name="quantity"
			bind:value={product.quantity}
			on:input={() => (product.quantity = validateQuantity(product, +product.quantity))}
		/>
		<button on:click={() => removeProductFromShoppingCart(product)}>Eliminar del carrito</button>
		<p>Numero de inventario: {product.inventoryId}</p>
		<p>Total: {product.quantity * product.price} $</p>
		<hr />
	{/each}
	{#if $shoppingCart.length > 0}
		<p>
			Subtotal: {$shoppingCart.reduce((acc, product) => acc + product.quantity * product.price, 0)} $
		</p>
		<RequestClientData
			cartTotal={$shoppingCart.reduce((acc, product) => acc + product.quantity * product.price, 0)}
			currentClient={client}
		/>
	{:else}
		<h2>Carrito Vacio</h2>
		<BranchSelection message="Ver Productos" />
	{/if}

	<br />
{/if}
