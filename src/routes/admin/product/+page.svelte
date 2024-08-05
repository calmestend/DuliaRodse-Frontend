<script lang="ts">
	import ModifyProduct from '$lib/components/admin/ModifyProduct.svelte';
	import type { Product } from '$lib/types';
	import type { PageData } from '../$types';

	export let data: PageData;
	const currentProducts: Product[] = data.currentProducts;
</script>

<h1>Productos</h1>
<button>Crear producto</button>
<button>Generar Reporte</button>

<div>
	{#if currentProducts}
		{#each currentProducts as product}
			<ModifyProduct bind:product />
		{/each}
	{:else}
		<p>No existen productos actualmente...</p>
	{/if}
</div>
