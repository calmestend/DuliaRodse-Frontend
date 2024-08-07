<script lang="ts">
	import '../../../style/style.scss';
	import CreateCategory from '$lib/components/admin/CreateCategory.svelte';
	import ModifyCategory from '$lib/components/admin/ModifyCategory.svelte';
	import { createCategoriesReport } from '$lib/pdf/reports/category';
	import type { Category } from '$lib/types';
	import type { PageData } from '../$types';

	export let data: PageData;
	const currentCategories: Category[] = data.currentCategories;
</script>

<h1>Categorias</h1>

<div class="buttons">
	<CreateCategory />
	<button class="btn" on:click={() => createCategoriesReport(currentCategories)}>
		Generar Reporte
	</button>
</div>

<div class="gallery">
	{#if currentCategories}
		{#each currentCategories as category}
			<div class="gallery-item">
				<ModifyCategory bind:category />
			</div>
		{/each}
	{:else}
		<p>No hay categorías existentes...</p>
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
