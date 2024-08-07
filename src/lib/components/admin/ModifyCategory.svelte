<script lang="ts">
	import { updateCategory } from '$lib/inventory/queries';
	import type { Category } from '$lib/types';

	export let category: Category;
	let editing = false;
	let categoryToEdit: Category | null = null;
	let errorMessage = '';

	function startEditing(category: Category) {
		editing = true;
		categoryToEdit = category;
	}

	function stopEditing() {
		editing = false;
		categoryToEdit = null;
		errorMessage = ''; // Limpiar mensaje de error al detener la edición
	}

	function applyChanges() {
		if (categoryToEdit) {
			if (categoryToEdit.name.trim() === '') {
				errorMessage = 'El nombre de la categoría no puede estar vacío.';
				return;
			}
			updateCategory(categoryToEdit);
			stopEditing();
		}
	}
</script>

<div class="category-card">
	<h2>{category.name}</h2>
	<div class="category-details">
		<div class="detail">
			<label for="categoryId">Category Id:</label>
			<span id="categoryId">{category.id}</span>
		</div>
		<div class="detail">
			<label for="name">Nombre:</label>
			<input
				type="text"
				bind:value={category.name}
				id="name"
				name="name"
				disabled={!editing || categoryToEdit !== category}
			/>
		</div>
	</div>

	{#if errorMessage}
		<p class="error-message">{errorMessage}</p>
	{/if}

	<div class="buttons">
		{#if editing && categoryToEdit === category}
			<button class="btn" type="button" on:click={applyChanges}>Aplicar cambios</button>
			<button class="btn" type="button" on:click={stopEditing}>Cancelar</button>
		{:else}
			<button class="btn" type="button" on:click={() => startEditing(category)}>Actualizar</button>
		{/if}
	</div>
</div>

<style lang="scss">
	.category-card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
	}

	.category-details {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.detail {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.detail label {
		font-weight: bold;
	}

	.detail span,
	.detail input {
		font-size: 1rem;
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}

	.error-message {
		color: red;
	}
</style>
