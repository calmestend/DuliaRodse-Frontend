<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AddProduct from '$lib/components/AddProduct.svelte';
	import { branchesStores, productsInventoryStores } from '$lib/inventory/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	const branchId = $page.params.branchId;
</script>

{#if $branchesStores.find((branch) => branch.id === parseInt(branchId) && branch.active)}
	<div class="products-container">
		{#each $productsInventoryStores as product}
			{#if product.branchId === parseInt(branchId) && product.active && product.existence > 0}
				<div class="product-card" style="background-image: url({product.img});">
					<div class="product-content">
						<div class="product-header">
							<p>{product.name}</p>
						</div>
						<div class="product-header">
							<p>{product.nameCategory}</p>
						</div>
						<div class="product-price">
							<p class="new">$ {product.price}</p>
						</div>

						{#if data.authenticated && data.admin === false}
							<div class="product-cart">
								<AddProduct {product} />
							</div>
						{/if}
						<button
							class="btn"
							on:click={() => goto(`/branch/${branchId}/products/${product.inventoryId}`)}
							>Ver Más</button
						>
					</div>
				</div>
			{/if}
		{/each}
	</div>
{:else}
	<h1>Sucursal inexistente o inactiva</h1>
{/if}

<style lang="scss">
	.products-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 3rem; /* Espacio entre tarjetas */
		padding: 1rem;
		box-sizing: border-box;
	}

	.product-card {
		font-size: 4rem;
		position: relative;
		min-height: 55vh;
		background-size: cover;
		background-position: center;
		color: #f0f8ff;
		border-radius: 8px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		box-sizing: border-box;
		transition:
			transform 0.3s,
			filter 0.3s;
	}

	.product-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.4);
		opacity: 0;
		transition:
			opacity 0.3s,
			backdrop-filter 0.3s;
		backdrop-filter: blur(0);
	}

	.product-content {
		position: relative;
		display: flex;
		flex-direction: column;
		flex: 1;
		opacity: 0;
		transition: opacity 0.3s;
	}

	.product-card:hover {
		transform: scale(1.01);
	}

	.product-card:hover::before {
		opacity: 1;
		backdrop-filter: blur(4px);
	}

	.product-card:hover .product-content {
		opacity: 1;
	}

	.product-header {
		margin-bottom: 1rem;
	}

	.product-price {
		margin-bottom: 1rem;
	}

	.product-cart {
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
	}

	.btn {
		margin-top: auto;
	}

	@media (max-width: 480px) {
		.product-card {
			font-size: 0.8rem;
		}
	}

	@media (min-width: 768px) {
		.products-container {
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		}
	}

	@media (min-width: 1024px) {
		.products-container {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
