<script lang="ts">
	import ModifyBranch from '$lib/components/admin/ModifyBranch.svelte';
	import type { BranchServer } from '$lib/types';
	import type { PageData } from '../$types';

	export let data: PageData;
	const currentBranchesServer: BranchServer[] = data.currentBranchesServer;
</script>

<h1>Sucursales</h1>
<button>Crear Sucursal</button>
<button>Generar Reporte</button>

<div>
	{#if currentBranchesServer}
		{#each currentBranchesServer as branch}
			<ModifyBranch bind:branch branches={data.currentBranches} />
		{/each}
	{:else}
		<p>No hay sucursales existentes...</p>
	{/if}
</div>
