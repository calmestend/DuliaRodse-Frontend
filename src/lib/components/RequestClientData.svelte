<script lang="ts">
	import { citiesStores } from '$lib/address/stores';
	import type { Client } from '$lib/types';
	import RequestDataClientModal from './RequestDataClientModal.svelte';

	let showModal = false;
	export let currentClient: Client;
	export let cartTotal: number;
</script>

<button type="button" on:click|preventDefault={() => (showModal = true)}>Comprar Producto</button>
<RequestDataClientModal bind:cartTotal bind:showModal bind:currentClient>
	<h2 slot="header">Actualiza tus datos en caso de requerir factura</h2>
	<label for="neighborhood">Colonia</label>
	<input type="neighborhood" name="neighborhood" bind:value={currentClient.neighborhood} />
	<br />

	<label for="street">Calle</label>
	<input type="text" name="street" bind:value={currentClient.street} />
	<br />

	<label for="intNumber">Numero Int.</label>
	<input type="number" name="intNumber" bind:value={currentClient.intNumber} />
	<br />

	<label for="extNumber">Numero Ext.</label>
	<input type="number" name="extNumber" bind:value={currentClient.extNumber} />
	<br />

	<label for="zipCode">Codigo Postal</label>
	<input type="number" name="zipCode" bind:value={currentClient.zipCode} />
	<br />

	<label for="rfc">Rfc</label>
	<input type="text" name="zipCode" bind:value={currentClient.rfc} />
	<br />

	<label for="city">Ciudad</label>
	<select name="city" size="1" bind:value={currentClient.city}>
		{#each $citiesStores as city}
			<option value={city.id}>{city.name}</option>
		{/each}
	</select>
	<br />
</RequestDataClientModal>
