<script lang="ts">
	import { createProduct } from '$lib/inventory/queries';
	import type { Product } from '$lib/types';

	export let showModal: boolean;
	export let product: Product;
	let dialog: HTMLDialogElement;
	let errorMessage = '';

	async function createProductWithValidation() {
		if (product.name.trim() === '') {
			errorMessage = 'El nombre del producto no puede estar vacío.';

			return;
		}

		if (product.scent.trim() === '') {
			errorMessage = 'El aroma del producto no puede estar vacío.';

			return;
		}

		await createProduct(product);

		dialog.close();
	}

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		{#if errorMessage}
			<p style="color: red;">{errorMessage}</p>
		{/if}
		<button on:click={() => createProductWithValidation()}>Crear Producto</button>

		<button on:click={() => dialog.close()}>Salir</button>
	</div>
</dialog>
