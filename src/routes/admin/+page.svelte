<script lang="ts">
	import { purchaseHistory } from '$lib/charts/queries';
	import { onMount } from 'svelte';

	let chartContainer: HTMLElement;

	onMount(() => {
		purchaseHistory(chartContainer);
	});
</script>

<main>
	<h1>Reportes</h1>
	<h2>Fecha x Total Vendido</h2>
	<div id="container" bind:this={chartContainer}></div>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		height: 100vh; /* Ocupa la altura completa de la ventana */
		padding: 2em;
	}

	h1,
	h2 {
		margin: 0;
	}

	h1 {
		font-size: 2rem; /* Ajusta el tamaño del texto según tus necesidades */
		margin-bottom: 0.5rem;
	}

	h2 {
		font-size: 1.5rem; /* Ajusta el tamaño del texto según tus necesidades */
		color: #1c1c1a; /* Puedes cambiar el color según tu preferencia */
	}
</style>
