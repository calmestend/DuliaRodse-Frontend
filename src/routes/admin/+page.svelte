<script lang="ts">
	import { purchaseHistory } from '$lib/charts/queries';
	import { onMount } from 'svelte';

	let chartContainer: HTMLElement;

	onMount(() => {
		purchaseHistory(chartContainer);
	});
</script>

<h1>Reportes</h1>
<h2>Fecha x Total Vendido</h2>
<div id="container" bind:this={chartContainer}></div>
