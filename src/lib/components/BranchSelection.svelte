<script lang="ts">
	import { branchesStores } from '$lib/inventory/stores';
	import BranchSelectionModal from './BranchSelectionModal.svelte';

	let showModal = false;
	let branchId: number = 1;

	export let message: string;

	function openModal() {
		showModal = true;
	}

	function handleRedirect() {
		showModal = false;
		window.location.href = `/branch/${branchId}/products`;
	}
</script>

<button class="btn" on:click={openModal}>
	{message}
</button>

<BranchSelectionModal bind:showModal>
	<h2 slot="header">Elige la sucursal de la que deseas ver los productos</h2>
	{#if $branchesStores}
		<div class="branch-selection">
			<label for="branches">Sucursales 👉</label>
			<select name="branches" id="branches" bind:value={branchId} size="1">
				{#each $branchesStores as branch}
					{#if branch.active}
						<option value={branch.id}>{branch.cityName}, {branch.stateName} </option>
					{/if}
				{/each}
			</select>
		</div>
		<button class="btn view-products" on:click={handleRedirect}>Ver Productos</button>
	{:else}
		<p>Cargando sucursales...</p>
	{/if}
</BranchSelectionModal>

<style lang="scss">
	.branch-selection {
		display: flex;
		align-items: center;
		gap: 0.6em;
	}

	.view-products {
		margin: 1em 0;
	}
</style>
