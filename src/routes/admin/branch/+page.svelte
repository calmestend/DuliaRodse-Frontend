<script lang="ts">
	import CreateBranch from '$lib/components/admin/CreateBranch.svelte';
	import ModifyBranch from '$lib/components/admin/ModifyBranch.svelte';
	import { createBranchesReport } from '$lib/pdf/reports/branch';
	import type { BranchServer } from '$lib/types';
	import type { PageData } from '../$types';

	export let data: PageData;
	const currentBranchesServer: BranchServer[] = data.currentBranchesServer;
</script>

<h1>Sucursales</h1>

<div class="buttons">
	<CreateBranch />
	<button class="btn" on:click={() => createBranchesReport(currentBranchesServer)}>
		Generar Reporte
	</button>
</div>

<div class="gallery">
	{#if currentBranchesServer}
		{#each currentBranchesServer as branch}
			<div class="gallery-item">
				<ModifyBranch bind:branch branches={data.currentBranches} />
			</div>
		{/each}
	{:else}
		<p>No hay sucursales existentes...</p>
	{/if}
</div>

<style lang="scss">
	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		padding: 1em;
	}

	.gallery {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		padding: 1em;
	}

	.gallery-item {
		flex: 1 1 calc(33.333% - 16px); // Tres elementos por fila, ajusta según el diseño
	}
</style>
