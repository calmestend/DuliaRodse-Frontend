<script lang="ts">
	import { createBranch } from '$lib/inventory/queries';
	import type { BranchServer } from '$lib/types';

	export let showModal: boolean;
	export let branch: BranchServer;
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
				createBranch(branch);
				dialog.close();
			}}>Crear Sucursal</button
		>
		<button on:click={() => dialog.close()}>Salir</button>
	</div>
</dialog>
