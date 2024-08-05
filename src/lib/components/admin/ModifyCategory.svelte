<script lang="ts">
	import { updateCategory } from '$lib/inventory/queries';
	import type { Category } from '$lib/types';

	export let category: Category;
	let editing = false;
	let categoryToEdit: Category | null = null;

	function startEditing(category: Category) {
		editing = true;
		categoryToEdit = category;
	}

	function stopEditing() {
		editing = false;
		categoryToEdit = null;
	}

	function applyChanges() {
		if (categoryToEdit) {
			updateCategory(categoryToEdit);
			stopEditing();
		}
	}
</script>

<form action="/admin/category">
	<h2 id="category">{category.name}</h2>
	<p>Category Id: {category.id}</p>

	<label for="name">Nombre</label>
	<input
		type="text"
		bind:value={category.name}
		name="name"
		disabled={!editing || categoryToEdit !== category}
	/>

	<br />
	{#if editing && categoryToEdit === category}
		<button on:click={applyChanges}>Aplicar cambios</button>
	{:else}
		<button on:click={() => startEditing(category)}>Actualizar</button>
	{/if}
</form>
