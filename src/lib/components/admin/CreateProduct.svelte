<script lang="ts">
	import type { Product } from '$lib/types';
	import CreateProductModal from './modals/CreateProductModal.svelte';

	let showModal = false;
	let product: Product = {
		id: 0,
		scent: '',
		categoryId: 0,
		img: '',
		cost: 1,
		grammage: 100,
		name: '',
		price: 1,
		active: false
	};
</script>

<button type="button" on:click|preventDefault={() => (showModal = true)}>Crear Producto</button>

<CreateProductModal bind:product bind:showModal>
	<h2 slot="header">Inserta los datos del producto</h2>
	<label for="name">Nombre</label>
	<input type="text" name="name" bind:value={product.name} />
	<br />
	<label for="grammage">Gramaje</label>
	<input type="number" name="grammage" bind:value={product.grammage} />
	<br />
	<label for="cost">Costo</label>
	<input type="number" name="cost" bind:value={product.cost} />
	<br />
	<label for="price">Precio</label>
	<input type="number" name="price" bind:value={product.price} />
	<br />
	<label for="img">Imagen</label>
	<input type="text" name="img" bind:value={product.img} />
	<br />
	<label for="category">Categoria</label>
	<!-- Foreach options-->
	<input type="text" name="category" bind:value={product.categoryId} />
	<br />
	<label for="scent">Aroma</label>
	<input type="text" name="name" bind:value={product.scent} />
	<br />
</CreateProductModal>
