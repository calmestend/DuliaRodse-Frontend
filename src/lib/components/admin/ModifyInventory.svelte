<script lang="ts">
	import { updateProductInventory } from '$lib/inventory/queries';
	import type { ProductInventory } from '$lib/types';

	export let product: ProductInventory;
	let editing = false;
	let productToEdit: ProductInventory | null = null;

	function startEditing(product: ProductInventory) {
		editing = true;
		productToEdit = product;
	}

	function stopEditing() {
		editing = false;
		productToEdit = null;
	}

	function applyChanges() {
		if (productToEdit) {
			updateProductInventory(productToEdit);
			stopEditing();
		}
	}
</script>

<form action="/admin/product">
	<h2 id="product">{product.name}</h2>
	<p>Numero de inventario: {product.inventoryId}</p>
	<p>Producto id: {product.id}</p>
	<p>{product.active ? 'Producto Activo' : 'Producto Inactivo'}</p>
	<p>Nombre: {product.name}</p>
	<p>Costo: {product.cost}</p>
	<p>Precio: {product.price}</p>
	<!-- TODO: Add img -->
	<label for="existence">Existencia</label>
	<input
		type="number"
		bind:value={product.existence}
		name="existence"
		disabled={!editing || productToEdit !== product}
	/>

	{#if editing && productToEdit === product}
		<button on:click={applyChanges}>Aplicar cambios</button>
	{:else}
		<button on:click={() => startEditing(product)}>Actualizar</button>
	{/if}
</form>
