<script lang="ts">
	import CreateCategory from '$lib/components/admin/CreateCategory.svelte';
	import ModifyCategory from '$lib/components/admin/ModifyCategory.svelte';
	import { createCategoriesReport } from '$lib/pdf/reports/category';
	import type { Category } from '$lib/types';
	import type { PageData } from '../$types';

	export let data: PageData;
	const currentCategories: Category[] = data.currentCategories;
</script>

<h1>Categoria</h1>
<CreateCategory />
<button on:click={() => createCategoriesReport(currentCategories)}>Generar Reporte</button>

<div>
	{#if currentCategories}
		{#each currentCategories as category}
			<ModifyCategory bind:category />
		{/each}
	{:else}
		<p>No hay categorias existentes...</p>
	{/if}
</div>
