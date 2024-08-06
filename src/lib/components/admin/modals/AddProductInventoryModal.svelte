<script lang="ts">
	import { createProductInventory } from '$lib/inventory/queries';
	import type { ProductInventory } from '$lib/types';

	export let showModal: boolean;
	export let product: ProductInventory;
	let dialog: HTMLDialogElement;

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
		<button
			on:click={() => {
				createProductInventory(product);
				dialog.close();
			}}>Crear Producto</button
		>
		<button on:click={() => dialog.close()}>Salir</button>
	</div>
</dialog>
