<script lang="ts">
	import { citiesStores } from '$lib/address/stores';
	import type { BranchServer } from '$lib/types';
	import CreateBranchModal from './modals/CreateBranchModal.svelte';

	let showModal = false;
	let branch: BranchServer = {
		id: 0,
		active: false,
		city: 1,
		street: '',
		zipCode: '',
		extNumber: '',
		intNumber: '',
		neighborhood: ''
	};
</script>

<button class="btn" type="button" on:click|preventDefault={() => (showModal = true)}
	>Crear Sucursal</button
>

<CreateBranchModal bind:branch bind:showModal>
	<h2 slot="header">Inserta los datos de la sucursal</h2>
	<label for="city">Ciudad</label>
	<select name="city" bind:value={branch.city}>
		{#each $citiesStores as city}
			<option value={city.id}>{city.name}</option>
		{/each}
	</select>
	<br />
	<label for="neighborhood">Colonia</label>
	<input type="text" name="neighborhood" bind:value={branch.neighborhood} />
	<br />
	<label for="street">Calle</label>
	<input type="text" name="street" bind:value={branch.street} />
	<br />
	<label for="zipCode">Codigo Postal</label>
	<input type="number" name="zipCode" bind:value={branch.zipCode} />
	<br />
	<label for="extNumber">Numero Exterior</label>
	<input type="number" name="extNumber" bind:value={branch.extNumber} />
	<br />
	<label for="intNumber">Numero Interior</label>
	<input type="number" name="intNumber" bind:value={branch.intNumber} />
	<br />
</CreateBranchModal>
