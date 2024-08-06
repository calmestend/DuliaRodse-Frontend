<script lang="ts">
	import { citiesStores } from '$lib/address/stores';
	import { disableBranch, enableBranch, updateBranch } from '$lib/inventory/queries';
	import type { Branch, BranchServer } from '$lib/types';

	export let branch: BranchServer;
	export let branches: Branch[];

	let editing = false;
	let branchToEdit: BranchServer | null = null;

	const currentBranch = branches.find((currentBranch) => currentBranch.id === branch.id);

	function startEditing(branch: BranchServer) {
		editing = true;
		branchToEdit = branch;
	}

	function stopEditing() {
		editing = false;
		branchToEdit = null;
	}

	function applyChanges() {
		if (branchToEdit) {
			updateBranch(branchToEdit);
			stopEditing();
		}
	}
</script>

<form action="/admin/branch">
	<h2 id="branch">{currentBranch?.cityName}, {currentBranch?.stateName}</h2>
	<p>Numero de sucursal: {branch.id}</p>
	<p>{branch.active ? 'Sucursal activa' : 'Sucursal inactiva'}</p>

	<br />
	<label for="neighborhood">Colonia</label>
	<input
		type="text"
		bind:value={branch.neighborhood}
		name="neighborhood"
		disabled={!editing || branchToEdit !== branch}
	/>

	<br />
	<label for="street">Calle</label>
	<input
		type="text"
		bind:value={branch.street}
		name="street"
		disabled={!editing || branchToEdit !== branch}
	/>

	<br />
	<label for="intNumber">Numero Interior</label>
	<input
		type="number"
		bind:value={branch.intNumber}
		name="intNumber"
		disabled={!editing || branchToEdit !== branch}
	/>

	<br />
	<label for="extNumber">Numero Exterior</label>
	<input
		type="number"
		bind:value={branch.extNumber}
		name="extNumber"
		disabled={!editing || branchToEdit !== branch}
	/>

	<br />
	<label for="zipCode">Codigo Postal</label>
	<input
		type="text"
		bind:value={branch.zipCode}
		name="zipCode"
		disabled={!editing || branchToEdit !== branch}
	/>

	<br />
	<label for="city">Ciudad</label>
	<select
		name="city"
		id="city"
		bind:value={branch.city}
		size="1"
		disabled={!editing || branchToEdit !== branch}
	>
		{#each $citiesStores as city}
			<option value={city.id}>{city.name}</option>
		{/each}
	</select>
	<br />
	{#if editing && branchToEdit === branch}
		<button on:click={applyChanges}>Aplicar cambios</button>
	{:else}
		<button on:click={() => startEditing(branch)}>Actualizar</button>
	{/if}
	{#if branch.active}
		<button on:click={() => disableBranch(branch.id)}>Desactivar</button>
	{:else}
		<button on:click={() => enableBranch(branch.id)}>Activar</button>
	{/if}
</form>
