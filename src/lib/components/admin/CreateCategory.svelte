<script lang="ts">
	import type { Category } from '$lib/types';
	import CreateCategoryModal from './modals/CreateCategoryModal.svelte';

	let showModal = false;
	let category: Category = {
		name: '',
		id: 0
	};
</script>

<button class="btn" type="button" on:click|preventDefault={() => (showModal = true)}
	>Crear Categoria</button
>

<CreateCategoryModal bind:category bind:showModal>
	<h2 slot="header">Inserta los datos de la categoria</h2>
	<label for="name">Nombre</label>
	<input type="text" name="name" bind:value={category.name} />
	<br />
</CreateCategoryModal>
