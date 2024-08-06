<script lang="ts">
	import AddProductInventory from '$lib/components/admin/AddProductInventory.svelte';
	import ModifyInventory from '$lib/components/admin/ModifyInventory.svelte';
	import { createProductsInventoryReport } from '$lib/pdf/reports/inventory';
	import type { ProductInventory } from '$lib/types';
	import type { PageData } from '../$types';

	export let data: PageData;
	const currentProductsInventory: ProductInventory[] = data.currentProductsInventory;
</script>

<h1>Inventario</h1>
<AddProductInventory />
<button on:click={() => createProductsInventoryReport(currentProductsInventory)}
	>Generar Reporte</button
>

<div>
	{#if currentProductsInventory}
		{#each currentProductsInventory as product}
			<ModifyInventory bind:product />
		{/each}
	{:else}
		<p>No hay sucursales existentes...</p>
	{/if}
</div>
