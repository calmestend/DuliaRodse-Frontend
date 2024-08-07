<script lang="ts">
	import CreateProduct from '$lib/components/admin/CreateProduct.svelte';
	import ModifyProduct from '$lib/components/admin/ModifyProduct.svelte';
	import { createProductsReport } from '$lib/pdf/reports/products';
	import type { Product } from '$lib/types';
	import type { PageData } from '../$types';

	export let data: PageData;
	const currentProducts: Product[] = data.currentProducts;
</script>

<h1>Productos</h1>
<div class="buttons">
	<CreateProduct />
	<button class="btn" on:click={() => createProductsReport(currentProducts)}>Generar Reporte</button
	>
</div>

<div class="gallery">
	{#if currentProducts && currentProducts.length > 0}
		{#each currentProducts as product}
			<div class="gallery-item">
				<ModifyProduct {product} />
			</div>
		{/each}
	{:else}
		<p>No hay productos existentes...</p>
	{/if}
</div>

<style lang="scss">
	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		padding: 1em;
	}

	.gallery {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		padding: 1em;
	}

	.gallery-item {
		flex: 1 1 calc(33% - 16px); // Tres elementos por fila, ajusta según el diseño
	}
</style>
