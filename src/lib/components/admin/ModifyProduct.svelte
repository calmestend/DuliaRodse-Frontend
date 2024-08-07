<script lang="ts">
	import { disableProduct, enableProduct, updateProduct } from '$lib/inventory/queries';
	import { categoriesStores } from '$lib/inventory/stores';
	import type { Product } from '$lib/types';

	export let product: Product;
	let editing = false;
	let productToEdit: Product | null = null;
	let errorMessage = '';

	function startEditing(product: Product) {
		editing = true;
		productToEdit = product;
	}

	function stopEditing() {
		editing = false;
		productToEdit = null;
	}

	async function applyChanges() {
		if (productToEdit) {
			if (productToEdit.name.trim() === '') {
				errorMessage = 'El nombre del producto no puede estar vacío.';
				return;
			}
			if (productToEdit.scent.trim() === '') {
				errorMessage = 'El aroma del producto no puede estar vacío.';
				return;
			}
			await updateProduct(productToEdit);
			stopEditing();
		}
	}

	function calculatePrice(cost: number) {
		return cost + cost * 0.33;
	}

	function validatePrice() {
		const minimumPrice = calculatePrice(product.cost);
		if (product.price < minimumPrice) {
			product.price = minimumPrice;
		}
	}

	function onCostInput(event: Event) {
		const input = event.target as HTMLInputElement;
		let cost = parseFloat(input.value);
		if (isNaN(cost) || cost < 1) {
			cost = 1;
		}
		product.cost = cost;
		product.price = calculatePrice(cost);
	}

	function onPriceInput(event: Event) {
		const input = event.target as HTMLInputElement;
		let price = parseFloat(input.value);
		if (isNaN(price) || price < 1) {
			price = 1;
		}
		product.price = price;
		validatePrice();
	}

	function onGrammageInput(event: Event) {
		const input = event.target as HTMLInputElement;
		let grammage = parseFloat(input.value);
		if (isNaN(grammage) || grammage < 1) {
			grammage = 1;
		}
		product.grammage = grammage;
	}

	async function onFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (file) {
			const formData = new FormData();
			formData.append('file', file);

			const response = await fetch('/?/uploadFile', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const data = await response.json();
				try {
					const parsedData = JSON.parse(data.data);
					const finalData = JSON.parse(parsedData[2]);
					const filePath = finalData.filePath;

					if (filePath) {
						product.img = filePath;
					} else {
						errorMessage = 'No se pudo obtener la ruta de la imagen.';
					}
				} catch (error) {
					console.error('Error parsing response:', error);
					errorMessage = 'Error al procesar la respuesta del servidor.';
				}
			} else {
				const error = await response.json();
				errorMessage = error.message;
			}
		}
	}
</script>

<form class="product-card">
	<h2 id="product">{product.name}</h2>
	<p>Product Id: {product.id}</p>
	<p>{product.active ? 'Producto Activo' : 'Producto Inactivo'}</p>

	<div class="detail">
		<label for="name">Nombre</label>
		<input
			type="text"
			bind:value={product.name}
			name="name"
			disabled={!editing || productToEdit !== product}
		/>
	</div>

	<div class="detail">
		<label for="grammage">Gramaje en gramos</label>
		<input
			type="number"
			bind:value={product.grammage}
			name="grammage"
			min="1"
			on:input={onGrammageInput}
			disabled={!editing || productToEdit !== product}
		/>
	</div>

	<div class="detail">
		<label for="cost">Costo</label>
		<input
			type="number"
			bind:value={product.cost}
			name="cost"
			id="cost"
			min="1"
			on:input={onCostInput}
			disabled={!editing || productToEdit !== product}
		/>
	</div>

	<div class="detail">
		<label for="price">Precio</label>
		<input
			type="number"
			bind:value={product.price}
			name="price"
			id="price"
			min="1"
			on:input={onPriceInput}
			disabled={!editing || productToEdit !== product}
		/>
	</div>

	<div class="detail">
		<label for="img">Imagen</label>
		<input
			type="file"
			name="file"
			id="file"
			on:change={onFileChange}
			disabled={!editing || productToEdit !== product}
		/>
	</div>

	{#if product.img}
		<img src={product.img} alt="Imagen del producto" style="max-width: 200px; max-height: 200px;" />
	{/if}

	<div class="detail">
		<label for="scent">Aroma</label>
		<input
			type="text"
			bind:value={product.scent}
			name="scent"
			disabled={!editing || productToEdit !== product}
		/>
	</div>

	<div class="detail">
		<label for="categories">Categoría</label>
		<select
			name="categories"
			bind:value={product.categoryId}
			disabled={!editing || productToEdit !== product}
			id="categoryId"
		>
			{#each $categoriesStores as category}
				<option value={category.id}>{category.name}</option>
			{/each}
		</select>
	</div>

	{#if errorMessage}
		<p class="error-message">{errorMessage}</p>
	{/if}

	{#if editing && productToEdit === product}
		<div class="buttons">
			<button type="button" class="btn" on:click={applyChanges}>Aplicar cambios</button>
			<button type="button" class="btn" on:click={stopEditing}>Cancelar</button>
		</div>
	{:else}
		<div class="buttons">
			<button type="button" class="btn" on:click={() => startEditing(product)}>Actualizar</button>
			{#if product.active}
				<button type="button" class="btn" on:click={() => disableProduct(product.id)}
					>Desactivar</button
				>
			{:else}
				<button type="button" class="btn" on:click={() => enableProduct(product.id)}>Activar</button
				>
			{/if}
		</div>
	{/if}
</form>

<style lang="scss">
	.product-card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
	}

	.detail {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem; /* Espacio entre label e input */
	}

	.detail label {
		flex-basis: 30%; /* Porcentaje de ancho para el label */
		font-weight: bold;
	}

	.detail input,
	.detail select {
		flex-basis: 65%; /* Porcentaje de ancho para el input/select */
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}

	.error-message {
		color: red;
		margin: 1rem 0;
		padding: 0;
	}
</style>
