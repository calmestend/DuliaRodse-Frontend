<script lang="ts">
	import AddReviewModal from './AddReviewModal.svelte';

	let showModal = false;

	export let id_pro: number;
	export let id_clie: number;

	let id_esc = 5;
	let com_rev = '';
</script>

<button on:click|preventDefault={() => (showModal = true)}>Anade una resena</button>
<AddReviewModal bind:showModal bind:id_clie bind:id_pro bind:id_esc bind:com_rev>
	<h2 slot="header">Anade una resena al producto :3</h2>
	<label for="id_esc">Calificacion</label>
	<input type="number" name="id_esc" min="1" max="5" bind:value={id_esc} />

	<label for="com_rev">Comentario</label>
	<textarea name="com_rev" bind:value={com_rev} placeholder="Escribe tu comentario"></textarea>
</AddReviewModal>
