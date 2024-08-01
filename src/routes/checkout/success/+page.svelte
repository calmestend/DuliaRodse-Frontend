<script>
	import { goto } from '$app/navigation';
</script>

<h1>Compra completada con exito</h1>
<!--TODO: print bill -->
<button>Imprimir factura</button>

<h2>Te gustaria agregar una resena a los productos comprados?</h2>
<button on:click={() => goto('/shoppingHistory')}>Visitar historial de compras</button>
