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

	function validateExistence(event: Event) {
		const input = event.target as HTMLInputElement;
		let existence = parseFloat(input.value);
		if (isNaN(existence) || existence < 0) {
			existence = 0;
		}
		product.existence = existence;
	}
</script>

<div class="product-card">
	<h2>{product.name}</h2>
	<div class="product-details">
		<div class="detail">
			<label for="inventoryId">Número de inventario:</label>
			<span id="inventoryId">{product.inventoryId}</span>
		</div>
		<div class="detail">
			<label for="productId">Producto ID:</label>
			<span id="productId">{product.id}</span>
		</div>
		<div class="detail">
			<label for="status">Estado:</label>
			<span id="status">{product.active ? 'Producto Activo' : 'Producto Inactivo'}</span>
		</div>
		<div class="detail">
			<label for="name">Nombre:</label>
			<span id="name">{product.name}</span>
		</div>
		<div class="detail">
			<label for="cost">Costo:</label>
			<span id="cost">{product.cost}</span>
		</div>
		<div class="detail">
			<label for="price">Precio:</label>
			<span id="price">{product.price}</span>
		</div>
		<div class="detail">
			<label for="branchId">Sucursal:</label>
			<span id="branchId">{product.branchId}</span>
		</div>
		<div class="detail">
			<label for="existence">Existencia:</label>
			<input
				type="number"
				bind:value={product.existence}
				id="existence"
				name="existence"
				min="0"
				on:input={validateExistence}
				disabled={!editing || productToEdit !== product}
			/>
		</div>
	</div>

	<div class="buttons">
		{#if editing && productToEdit === product}
			<button class="btn" type="button" on:click={applyChanges}>Aplicar cambios</button>
			<button class="btn" type="button" on:click={stopEditing}>Cancelar</button>
		{:else}
			<button class="btn" type="button" on:click={() => startEditing(product)}>Actualizar</button>
		{/if}
	</div>
</div>

<style lang="scss">
	.product-card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
	}

	.product-details {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.detail {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.detail label {
		font-weight: bold;
	}

	.detail span,
	.detail input {
		font-size: 1rem;
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}
</style>
