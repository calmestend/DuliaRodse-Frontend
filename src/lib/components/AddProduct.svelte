<script lang="ts">
	import type { ProductInventory } from '$lib/types';
	import AddProductModal from './AddProductModal.svelte';

	let showModal = false;
	let quantity = 1;
	export let product: ProductInventory;
</script>

<button class="btn" type="button" on:click|preventDefault={() => (showModal = true)}
	>Anadir producto</button
>

<AddProductModal bind:quantity bind:product bind:showModal>
	<h2 slot="header">{product.name}</h2>
	<p>Precio: {product.price} $</p>
	<label for="quantity">Cantidad</label>
	<input type="number" min="1" max={product.existence} name="quantity" bind:value={quantity} />
	<br />
	<p>Total: {product.price * quantity} $</p>
</AddProductModal>
