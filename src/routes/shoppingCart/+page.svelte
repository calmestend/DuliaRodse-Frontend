<script lang="ts">
	import { removeProductFromShoppingCart, shoppingCart } from '$lib/shopping/stores';
</script>

{#if $shoppingCart}
	{#each $shoppingCart as product}
		<p>Nombre: {product.name},</p>
		<p>Precio: {product.price},</p>
		<label for="quantity">Cantidad</label>
		<input type="number" name="quantity" bind:value={product.quantity} />
		<button on:click={() => removeProductFromShoppingCart(product)}>Eliminar del carrito</button>
		<p>Numero de inventario: {product.inventoryId}</p>
		<p>Total: {product.quantity * product.price} $</p>
		<hr />
	{/each}
	{#if $shoppingCart.length > 0}
		<p>
			Subtotal: {$shoppingCart.reduce((acc, product) => acc + product.quantity * product.price, 0)} $
		</p>
		<button>Comprar Productos</button>
	{/if}
	<br />
{/if}
