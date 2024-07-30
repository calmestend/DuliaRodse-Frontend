<script lang="ts">
	import { branchesStores } from '$lib/inventory/stores';
	import BranchSelectionModal from './BranchSelectionModal.svelte';

	let showModal = false;

	export let message: string;

	let branchId: number = 1;
</script>

<li>
	<a href={`/branch/${branchId}/products`} on:click|preventDefault={() => (showModal = true)}
		>{message}</a
	>
</li>
<BranchSelectionModal bind:showModal>
	<h2 slot="header">Elige la sucursal de la que deseas ver los productos</h2>
	{#if $branchesStores}
		<label for="branches">Sucursales</label>
		<select name="branches" id="branches" bind:value={branchId} size="1">
			{#each $branchesStores as branch}
				<option value={branch.id}>{branch.cityName}, {branch.stateName}</option>
			{/each}
		</select>
		<button
			on:click={() => {
				showModal = false;
				window.location.href = `/branch/${branchId}/products`;
			}}>Ver Productos</button
		>
	{:else}
		<p>Cargando sucursales...</p>
	{/if}
</BranchSelectionModal>
