<script lang="ts">
	import { branchesStores, fillBranchesStores } from '$lib/inventory/stores';
	import type { Branch } from '$lib/types';
	import { onMount } from 'svelte';
	import BranchSelectionModal from './BranchSelectionModal.svelte';
	let showModal = false;
	let branchId: number = 1;
	let branches: Branch[];
	onMount(() => {
		branchesStores.set([]);
		fillBranchesStores();
	});
	branchesStores.subscribe((value) => {
		branches = value;
	});
</script>

<li>
	<a href={`/branch/${branchId}/products`} on:click|preventDefault={() => (showModal = true)}
		>Productos</a
	>
</li>
<BranchSelectionModal bind:showModal>
	<h2 slot="header">Elige la sucursal de la que deseas ver los productos</h2>
	{#if branches}
		<label for="branches">Sucursales</label>
		<select name="branches" id="branches" bind:value={branchId} size="1">
			{#each branches as branch}
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
