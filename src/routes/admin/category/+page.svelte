<script lang="ts">
	import ModifyCategory from '$lib/components/admin/ModifyCategory.svelte';
	import type { Category } from '$lib/types';
	import type { PageData } from '../$types';

	export let data: PageData;
	const currentCategories: Category[] = data.currentCategories;
</script>

<h1>Categoria</h1>
<button>Crear Categoria</button>
<button>Generar Reporte</button>

<div>
	{#if currentCategories}
		{#each currentCategories as category}
			<ModifyCategory bind:category />
		{/each}
	{:else}
		<p>No hay categorias existentes...</p>
	{/if}
</div>
