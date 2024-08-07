<script lang="ts">
	import { removeProductFromShoppingCart, shoppingCart } from '$lib/shopping/stores';
	import type { PageData } from '../$types';
	import BranchSelection from '$lib/components/BranchSelection.svelte';
	import RequestClientData from '$lib/components/RequestClientData.svelte';
	import type { Client, ProductShoppingCart } from '$lib/types';
	import { branchesStores } from '$lib/inventory/stores';

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

<h1>Carrito de Compras</h1>
{#if $shoppingCart}
	{#each $shoppingCart as product}
		<div class="product-card">
			<p><strong>Nombre:</strong> {product.name}</p>
			<p><strong>Precio:</strong> {product.price} $</p>
			<label for="quantity"><strong>Cantidad:</strong></label>
			<input
				type="number"
				name="quantity"
				bind:value={product.quantity}
				on:input={() => (product.quantity = validateQuantity(product, +product.quantity))}
			/>
			<button class="btn-remove" on:click={() => removeProductFromShoppingCart(product)}
				>Eliminar del carrito</button
			>
			<p>
				<strong>Proveniente de la Sucursal:</strong>
				{$branchesStores.find((branch) => branch.id === product.branchId)?.cityName}
				{$branchesStores.find((branch) => branch.id === product.branchId)?.stateName}
			</p>
			<p><strong>Total:</strong> {product.quantity * product.price} $</p>
		</div>
	{/each}
	{#if $shoppingCart.length > 0}
		<div class="subtotal">
			<p>
				<strong>Subtotal:</strong>
				{$shoppingCart.reduce((acc, product) => acc + product.quantity * product.price, 0)} $
			</p>
			<RequestClientData
				cartTotal={$shoppingCart.reduce(
					(acc, product) => acc + product.quantity * product.price,
					0
				)}
				currentClient={client}
			/>
		</div>
	{:else}
		<h2>Carrito Vacio</h2>
		<BranchSelection message="Ver Productos" />
	{/if}

	<br />
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

	.product-card {
		padding: 1rem;
		margin-bottom: 1rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);

		p {
			margin: 0.5rem 0;
			font-size: 1rem;
			color: $primary-color;
			font-size: 1.2rem;
		}

		strong {
			color: $primary-color;
			font-size: 1.2rem;
		}

		label {
			font-size: 1.2rem;
			display: block;
			margin: 0.5rem 0;
			font-weight: bold;
		}

		input {
			width: 100%;
			padding: 0.5rem;
			border: 1px solid #ddd;
			border-radius: 4px;
			margin-bottom: 0.5rem;
		}

		.btn-remove {
			background-color: $primary-color;
			color: $accent-color;
			border: none;
			padding: 0.5rem 1rem;
			cursor: pointer;
			margin-top: 0.5rem;

			&:hover {
				background-color: darken($primary-color, 10%);
			}
		}
	}

	.subtotal {
		padding: 1rem;
		margin-top: 1rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
		text-align: right;

		p {
			font-size: 1.2rem;
			color: $primary-color;
		}
	}
</style>
