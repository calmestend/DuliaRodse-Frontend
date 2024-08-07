<script lang="ts">
	import type { Product } from '$lib/types';
	import CreateProductModal from './modals/CreateProductModal.svelte';
	import { categoriesStores } from '$lib/inventory/stores';

	let showModal = false;
	let product: Product = {
		id: 0,
		scent: '',
		categoryId: 0,
		img: '',
		cost: 1,
		grammage: 100,
		name: '',
		price: 1.33,
		active: false
	};

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
					// Parse the stringified JSON in the `data` field
					const parsedData = JSON.parse(data.data);

					// The actual filePath should be in the last element of the parsed array
					const finalData = JSON.parse(parsedData[2]);
					const filePath = finalData.filePath;

					if (filePath) {
						product.img = filePath;
					}
				} catch (error) {
					console.error('Error parsing response:', error);
				}
			}
		}
	}
</script>

<button class="btn" type="button" on:click|preventDefault={() => (showModal = true)}
	>Crear Producto</button
>

<CreateProductModal bind:product bind:showModal>
	<label for="name">Nombre</label>
	<input type="text" bind:value={product.name} name="name" />

	<br />
	<label for="grammage">Gramaje en gramos</label>
	<input
		type="number"
		bind:value={product.grammage}
		name="grammage"
		min="1"
		on:input={onGrammageInput}
	/>

	<br />
	<label for="cost">Costo</label>
	<input
		type="number"
		bind:value={product.cost}
		name="cost"
		id="cost"
		min="1"
		on:input={onCostInput}
	/>

	<br />
	<label for="price">Precio</label>
	<input
		type="number"
		bind:value={product.price}
		name="price"
		id="price"
		min="1"
		on:input={onPriceInput}
	/>

	<br />
	<label for="img">Imagen</label>
	<input type="file" name="file" id="file" bind:value={product.img} on:change={onFileChange} />

	{#if product.img}
		<br />
		<img src={product.img} alt="Imagen del producto" style="max-width: 200px; max-height: 200px;" />
	{/if}

	<br />
	<label for="scent">Aroma</label>
	<input type="text" bind:value={product.scent} name="scent" />

	<br />
	<label for="categories">Categoría</label>
	<select name="categories" bind:value={product.categoryId} id="categoryId">
		{#each $categoriesStores as category}
			<option value={category.id}>{category.name}</option>
		{/each}
	</select>
</CreateProductModal>
