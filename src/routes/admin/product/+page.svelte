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
<CreateProduct />
<button on:click={() => createProductsReport(currentProducts)}>Generar Reporte</button>

<div>
	{#if currentProducts}
		{#each currentProducts as product}
			<ModifyProduct bind:product />
		{/each}
	{:else}
		<p>No hay productos existentes...</p>
	{/if}
</div>
