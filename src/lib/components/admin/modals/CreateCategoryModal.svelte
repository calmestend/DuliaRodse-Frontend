<script lang="ts">
	import { createCategory } from '$lib/inventory/queries';
	import type { Category } from '$lib/types';

	export let showModal: boolean;
	export let category: Category;
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
				createCategory(category);
				dialog.close();
			}}>Crear Categoria</button
		>
		<button on:click={() => dialog.close()}>Salir</button>
	</div>
</dialog>
