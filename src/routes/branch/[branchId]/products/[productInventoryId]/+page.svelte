<script lang="ts">
	import type { PageData } from '../$types';
	import { goto } from '$app/navigation';
	import type { ProductInventory, Review } from '$lib/types';
	import AddProduct from '$lib/components/AddProduct.svelte';
	import { branchesStores } from '$lib/inventory/stores';

	export let data: PageData;
	const currentProduct: ProductInventory = data.currentProduct;
	const currentReviews: Review[] = data.currentReviews;
</script>

{#if currentProduct}
	<div class="product-detail-card">
		<h2>{currentProduct.name}</h2>
		<h3>{currentProduct.nameCategory}</h3>
		<h3>
			Producto de la Sucursal:
			{$branchesStores.find((branch) => branch.id === currentProduct.branchId)?.cityName},
			{$branchesStores.find((branch) => branch.id === currentProduct.branchId)?.stateName}
		</h3>
		<h3>Jabones Disponibles: {currentProduct.existence}</h3>
		<div class="image-container">
			<img src={currentProduct.img} alt={currentProduct.name} />
		</div>
		{#if data.authenticated}
			<AddProduct product={currentProduct} />
		{:else}
			<p>Inicia sesión para añadir al carrito</p>
			<button class="btn" on:click={() => goto('/auth/login')}>Iniciar sesión</button>
		{/if}
		<div class="reviews-section">
			<h2>Reseñas del producto</h2>
			{#if currentReviews.length > 0}
				{#each currentReviews as review}
					<p><strong>Estrellas:</strong> {review.scaleId}</p>
					<p><strong>Comentario:</strong> {review.commentary}</p>
					<hr />
				{/each}
			{:else}
				<p>Aún no contamos con reseñas, sé el primero en hacerlo uwu</p>
			{/if}
		</div>
	</div>
{:else}
	<p>El producto no existe</p>
{/if}

<style lang="scss">
	/* Paleta de colores */
	$primary-color: #1e1e1e; /* Color de texto y detalles */
	$background-color: #ffffff; /* Fondo blanco para el contenido */
	$accent-color: #f0f8ff; /* Color de acento para detalles y botones */

	h2,
	h3 {
		color: $primary-color;
	}

	.product-detail-card {
		padding: 1.5rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
		margin-bottom: 1.5rem;

		h2 {
			font-size: 2rem;
			text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			margin-bottom: 1rem;
		}

		h3 {
			font-size: 1.5rem;
			margin-bottom: 1rem;
		}

		.image-container {
			margin: 1rem 0;

			img {
				width: 20%;
				height: auto;
				border-radius: 8px;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
			}
		}

		.reviews-section {
			margin-top: 2rem;

			h2 {
				font-size: 1.5rem;
				margin-bottom: 1rem;
			}

			p {
				margin: 0.5rem 0;
				font-size: 1rem;
				color: $primary-color;

				strong {
					color: $primary-color;
				}
			}

			hr {
				border: none;
				border-top: 1px solid #ddd;
				margin: 1rem 0;
			}
		}
	}
</style>
