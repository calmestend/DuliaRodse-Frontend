<script lang="ts">
	import type { ProductInventory } from '$lib/types';
	import AddProductInventoryModal from './modals/AddProductInventoryModal.svelte';

	let showModal = false;
	let product: ProductInventory = {
		active: true,
		id: 1,
		name: '',
		price: 0,
		grammage: 0,
		cost: 0,
		img: '',
		scent: '',
		branchId: 1,
		existence: 0,
		inventoryId: 0,
		nameCategory: ''
	};
</script>

<button type="button" on:click|preventDefault={() => (showModal = true)}
	>Anadir producto a inventario</button
>

<AddProductInventoryModal bind:product bind:showModal>
	<h2 slot="header">Inserta los datos de producto a anadir</h2>
	<label for="branch">Sucursal</label>
	<input type="text" name="branch" bind:value={product.branchId} />
	<br />
	<label for="product">Producto</label>
	<input type="text" name="product" bind:value={product.id} />
	<br />
	<label for="existence">Existencia</label>
	<input type="text" name="existence" bind:value={product.existence} />
	<br />
</AddProductInventoryModal>
