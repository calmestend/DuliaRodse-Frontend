<script lang="ts">
	import { removeProductFromShoppingCart, shoppingCart } from '$lib/shopping/stores';
</script>

{#if $shoppingCart}
	{#each $shoppingCart as product}
		<p>
			Numero de inventario: {product.inventoryId}, Nombre: {product.name}, Cantidad: {product.quantity}
		</p>
		<p>Total: {product.quantity * product.price}</p>
		<button on:click={() => removeProductFromShoppingCart(product)}>Eliminar del carrito</button>
	{/each}
	<br />
	<button>Comprar Productos</button>
{/if}
