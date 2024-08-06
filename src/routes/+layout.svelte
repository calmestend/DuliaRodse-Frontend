<script lang="ts">
	import 'normalize.css';
	import '../style/style.scss';
	import BranchSelection from '$lib/components/BranchSelection.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { fillBranchesStores } from '$lib/inventory/stores';
	export let data: PageData;
	console.log(data.user);

	let menuOpen = false;

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	onMount(() => {
		fillBranchesStores();
	});
</script>

<nav>
	<button class="menu-toggle" on:click={toggleMenu}>
		&#9776; <!-- ícono de "hamburguesa" -->
	</button>
	<ul class:active={menuOpen}>
		{#if data.authenticated}
			{#if data.user?.role === 'admin'}
				<li><a href="/admin" on:click={closeMenu}>Reportes</a></li>
				<li><a href="/admin/inventory" on:click={closeMenu}>Inventario</a></li>
				<li><a href="/admin/branch" on:click={closeMenu}>Sucursales</a></li>
				<li><a href="/admin/category" on:click={closeMenu}>Categorias</a></li>
				<li><a href="/admin/product" on:click={closeMenu}>Productos</a></li>
			{:else}
				<li><a href="/" on:click={closeMenu}>DuliaRodse</a></li>
				<li><a href="/shoppingCart" on:click={closeMenu}>Carrito de compras</a></li>
				<li><a href="/shoppingHistory" on:click={closeMenu}>Historial de compras</a></li>
				<BranchSelection message={'Productos'} />
			{/if}
			<form action="/?/logout" method="POST">
				<button class="logout" formaction="/?/logout" on:click={closeMenu}>Cerrar Sesion</button>
			</form>
		{:else}
			<li><a href="/" on:click={closeMenu}>DuliaRodse</a></li>
			<li><a href="/auth/login" on:click={closeMenu}>Iniciar Sesion</a></li>
			<li><a href="/auth/signup" on:click={closeMenu}>Registrate</a></li>
			<BranchSelection message={'Productos'} />
		{/if}
	</ul>
</nav>

<slot />

<style lang="scss">
	.logout {
		display: flex;
		align-items: center;
		background-color: #111;
		padding: 0 0.725rem;
		border: 1px solid;
		text-decoration: none;
		color: #f0f8ff;
		border: 1px solid #111;
		height: 2em;
		font-size: 1rem;
		cursor: pointer;
	}

	nav {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra sutil debajo de la navbar */
		position: sticky; /* Hace que la navbar sea sticky */
		margin-bottom: 0.25em; /* Ajusta el padding según sea necesario */
		top: 0;
		z-index: 1000;
		background-color: #f0f8ff;

		ul {
			display: flex;
			list-style: none;
			padding: 0;
			margin: 0;
			align-items: center;

			@media (max-width: 768px) {
				padding-bottom: 100vh;
			}

			li {
				display: flex;
				align-items: center;
				padding: 1.5rem;

				&:last-child {
					margin-right: 0;
				}

				a {
					text-decoration: none;
					color: inherit;
				}
			}

			@media (max-width: 768px) {
				display: none;
				flex-direction: column;

				&.active {
					display: flex;
				}

				li {
					margin: 0.5em 0;
					padding: 0.2em 0;
				}
			}
		}

		.menu-toggle {
			display: none;
			background-color: transparent;
			border: none;
			font-size: 2em;
			line-height: 1; /* Asegura que el ícono de hamburguesa esté alineado verticalmente */

			@media (max-width: 768px) {
				display: block;
			}
		}
	}
</style>
