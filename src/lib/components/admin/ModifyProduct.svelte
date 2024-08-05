<script lang="ts">
	import { disableProduct, enableProduct, updateProduct } from '$lib/inventory/queries';
	import type { Product } from '$lib/types';

	export let product: Product;
	let editing = false;
	let productToEdit: Product | null = null;

	function startEditing(product: Product) {
		editing = true;
		productToEdit = product;
	}

	function stopEditing() {
		editing = false;
		productToEdit = null;
	}

	function applyChanges() {
		if (productToEdit) {
			updateProduct(productToEdit);
			stopEditing();
		}
	}
</script>

<form action="/admin/product">
	<h2 id="product">{product.name}</h2>
	<p>Product Id: {product.id}</p>
	<p>{product.active ? 'Producto Activo' : 'Producto Inactivo'}</p>

	<label for="name">Nombre</label>
	<input
		type="text"
		bind:value={product.name}
		name="name"
		disabled={!editing || productToEdit !== product}
	/>

	<br />
	<label for="grammage">Gramaje en gramos</label>
	<input
		type="number"
		bind:value={product.grammage}
		name="grammage"
		min="1"
		disabled={!editing || productToEdit !== product}
	/>

	<br />
	<label for="cost">Costo</label>
	<input
		type="number"
		bind:value={product.cost}
		name="cost"
		id="cost"
		min="1"
		disabled={!editing || productToEdit !== product}
	/>

	<br />
	<label for="price">Price</label>
	<input
		type="number"
		bind:value={product.price}
		name="price"
		id="price"
		min="1"
		disabled={!editing || productToEdit !== product}
	/>

	<br />
	<label for="img">Imagen</label>
	<input
		type="text"
		bind:value={product.img}
		name="img"
		disabled={!editing || productToEdit !== product}
	/>

	<br />
	<label for="scent">Aroma</label>
	<input
		type="text"
		bind:value={product.scent}
		name="scent"
		disabled={!editing || productToEdit !== product}
	/>

	<br />
	<label for="categorieId">Categoria</label>
	<input
		type="text"
		bind:value={product.categorieId}
		name="categorieId"
		id="categorieId"
		disabled={!editing || productToEdit !== product}
	/>
	<br />
	{#if editing && productToEdit === product}
		<button on:click={applyChanges}>Aplicar cambios</button>
	{:else}
		<button on:click={() => startEditing(product)}>Actualizar</button>
	{/if}
	{#if product.active}
		<button on:click={() => disableProduct(product.id)}>Desactivar</button>
	{:else}
		<button on:click={() => enableProduct(product.id)}>Activar</button>
	{/if}
</form>
