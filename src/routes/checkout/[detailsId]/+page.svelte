<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { currentPaymentId } from '$lib/payment/stores';

	const urlPaymentId = $page.params.detailsId;
</script>

{#if $currentPaymentId === urlPaymentId && $currentPaymentId && urlPaymentId}
	<h1>Compra completada con exito</h1>
	<!--TODO: print bill -->
	<button>Imprimir factura</button>

	<h2>Te gustaria agregar una resena a los productos comprados?</h2>
	<button on:click={() => goto('/shoppingHistory')}>Visitar historial de compras</button>
{:else}
	<h1>La compra ha expirado o no existe</h1>
{/if}
