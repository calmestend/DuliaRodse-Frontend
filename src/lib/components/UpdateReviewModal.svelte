<script lang="ts">
	import { updateReview } from '$lib/review/queries';
	import { clientReviews, fillClientReviews } from '$lib/review/stores';

	export let showModal: boolean;
	export let id_rev: number;
	export let id_esc: number;
	export let id_clie: number;
	export let com_rev: string;
	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot name="header" />
		<hr />
		<slot />
		<button
			on:click={async () => {
				await updateReview(id_esc, id_rev, com_rev);
				clientReviews.set([]);
				await fillClientReviews(id_clie);
				location.reload();
			}}>actualizar resena</button
		>
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()}>Salir</button>
	</div>
</dialog>
