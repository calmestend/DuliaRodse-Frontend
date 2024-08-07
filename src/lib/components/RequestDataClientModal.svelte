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
	<div on:click|stopPropagation class="dialog-content">
		<slot name="header" />
		<hr />
		<slot />
		<button
			on:click={async () => {
				await updateClient(currentClient);
				dialog.close();
			}}>Usar estos datos</button
		>
		<div class="button-container">
			<button on:click={() => dialog.close()}>Salir</button>
		</div>
	</div>
</dialog>

{#if renderCheckout}
	<h2>Elige el metodo de pago</h2>
	<PaypalButton bind:cartTotal clientId={currentClient.id} />
{/if}

<style lang="scss">
	:global(dialog[open]::backdrop) {
		backdrop-filter: blur(3px); /* Efecto de desenfoque en el fondo */
		background: rgba(0, 0, 0, 0.5); /* Fondo oscuro semi-transparente */
	}

	dialog {
		width: 66vw; /* Ancho por defecto para móviles */
		max-width: 100vw; /* Ancho máximo para dispositivos grandes */
		height: auto; /* Ancho por defecto para móviles */
		max-height: 100vh; /* Ancho máximo para dispositivos grandes */
		border: none;
		border-radius: 8px;
		background: #f0f8ff; /* Color de fondo del modal */
	}

	.dialog-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 1rem;
	}

	.exit {
		background-color: #111;
		border: 1px solid #000;
		color: #f0f8ff;
		padding: 0.5rem 1rem; /* Añadido padding para el botón */
	}

	@media (min-width: 320px) {
		dialog {
			width: 88vw; /* Ancho por defecto para móviles */
			max-height: 66vh; /* Ancho máximo para dispositivos grandes */
			font-size: 1rem;
		}

		.dialog-content {
			font-size: 1rem; /* Tamaño de fuente para dispositivos muy pequeños */
		}
	}
	@media (min-width: 768px) {
		dialog {
			width: 66vw; /* Ancho para pantallas grandes de escritorio */
			height: 88vh; /* Ancho para pantallas grandes de escritorio */
		}
	}

	@media (min-width: 1024px) {
		dialog {
			width: 33vw; /* Ancho para pantallas grandes de escritorio */
			height: 100vh; /* Ancho para pantallas grandes de escritorio */
		}
	}
</style>
