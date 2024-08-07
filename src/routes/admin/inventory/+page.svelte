<script lang="ts">
	import '../../../style/style.scss';
	import AddProductInventory from '$lib/components/admin/AddProductInventory.svelte';
	import ModifyInventory from '$lib/components/admin/ModifyInventory.svelte';
	import { createProductsInventoryReport } from '$lib/pdf/reports/inventory';
	import type { ProductInventory } from '$lib/types';
	import type { PageData } from '../$types';

	export let data: PageData;
	const currentProductsInventory: ProductInventory[] = data.currentProductsInventory;
</script>

<h1>Inventario</h1>
<div class="buttons">
	<AddProductInventory />
	<button class="btn" on:click={() => createProductsInventoryReport(currentProductsInventory)}>
		Generar Reporte
	</button>
</div>

<div class="gallery">
	{#if currentProductsInventory}
		{#each currentProductsInventory as product}
			<div class="gallery-item">
				<ModifyInventory bind:product />
			</div>
		{/each}
	{:else}
		<p>No hay sucursales existentes...</p>
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
		flex: 1 1 calc(33.333% - 16px); // Tres elementos por fila, ajusta según el diseño
	}
</style>
