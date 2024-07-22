<script lang="ts">
	import { updateClient } from '$lib/auth/stores';
	import type { Client } from '$lib/types';
	import PaypalButton from './PaypalButton.svelte';

	export let showModal: boolean;
	export let currentClient: Client;
	export let cartTotal: number;
	let renderCheckout = false;
	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();

	function handleClose() {
		showModal = false;
		renderCheckout = true;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close={handleClose} on:click|self={() => dialog.close()}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<!-- svelte-ignore a11y-autofocus -->
		<button
			on:click={async () => {
				await updateClient(currentClient);
				dialog.close();
			}}>Usar estos datos</button
		>
		<button on:click={() => dialog.close()}>Salir</button>
	</div>
</dialog>

{#if renderCheckout}
	<h2>Elige el metodo de pago</h2>
	<PaypalButton bind:cartTotal clientId={currentClient.id} />
{/if}
