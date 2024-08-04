<script lang="ts">
	import UpdateReviewModal from './UpdateReviewModal.svelte';

	let showModal = false;

	export let id_rev: number;
	export let id_clie: number;
	export let id_esc: number;
	export let com_rev: string;
</script>

<button on:click|preventDefault={() => (showModal = true)}>Actualiza tu resena</button>
<UpdateReviewModal bind:showModal bind:id_clie bind:id_rev bind:id_esc bind:com_rev>
	<h2 slot="header">Actualiza la resena de tu producto</h2>
	<label for="id_esc">Calificacion</label>
	<input type="number" name="id_esc" min="1" max="5" bind:value={id_esc} />

	<label for="com_rev">Comentario</label>
	<input type="textarea" bind:value={com_rev} placeholder="Escribe tu comentario" />
</UpdateReviewModal>
