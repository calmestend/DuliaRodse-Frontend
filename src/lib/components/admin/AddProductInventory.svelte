<script lang="ts">
	import { branchesStores, fillProductStores, productsStores } from '$lib/inventory/stores';
	import type { ProductInventory } from '$lib/types';
	import { onMount } from 'svelte';
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

	onMount(async () => {
		productsStores.set([]);
		await fillProductStores();
	});

	function onExistenceInput(event: Event) {
		const input = event.target as HTMLInputElement;
		let existence = parseFloat(input.value);
		if (isNaN(existence) || existence < 0) {
			existence = 0;
		}
		product.existence = existence;
	}
</script>

<button class="btn" type="button" on:click|preventDefault={() => (showModal = true)}>
	Anadir producto a inventario
</button>

<AddProductInventoryModal bind:product bind:showModal>
	<h2 slot="header">Inserta los datos de producto a añadir</h2>
	<form>
		<table>
			<tr>
				<td><label for="branch">Sucursal</label></td>
				<td>
					<select id="branch" name="branch" bind:value={product.branchId}>
						{#each $branchesStores as branch}
							<option value={branch.id}>{branch.cityName}</option>
						{/each}
					</select>
				</td>
			</tr>

			<tr>
				<td><label for="product">Producto</label></td>
				<td>
					<select id="product" name="product" bind:value={product.id}>
						{#each $productsStores as productStore}
							<option value={productStore.id}>{productStore.name}</option>
						{/each}
					</select>
				</td>
			</tr>

			<tr>
				<td><label for="existence">Existencia</label></td>
				<td>
					<input
						type="text"
						id="existence"
						name="existence"
						bind:value={product.existence}
						on:input={onExistenceInput}
					/>
				</td>
			</tr>
		</table>
	</form>
</AddProductInventoryModal>

<style lang="scss">
	table {
		width: 100%;
		border-collapse: collapse;
	}

	td {
		padding: 0.5rem;
	}

	label {
		display: block;
		font-weight: bold;
	}

	select,
	input {
		width: 100%;
		padding: 0.5rem;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}
</style>
