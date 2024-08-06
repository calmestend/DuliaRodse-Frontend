<script lang="ts">
	import BranchSelection from '$lib/components/BranchSelection.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { fillBranchesStores } from '$lib/inventory/stores';
	export let data: PageData;
	console.log(data.user);

	onMount(() => {
		fillBranchesStores();
	});
</script>

<nav>
	<ul>
		{#if data.authenticated}
			{#if data.user?.role === 'admin'}
				<li><a href="/admin">Reportes</a></li>
				<li><a href="/admin/inventory">Inventario</a></li>
				<li><a href="/admin/branch">Sucursales</a></li>
				<li><a href="/admin/category">Categorias</a></li>
				<li><a href="/admin/product">Productos</a></li>
			{:else}
				<li><a href="/">DuliaRodse</a></li>
				<BranchSelection message={'Productos'} />
				<li><a href="/shoppingCart">Carrito de compras</a></li>
				<li><a href="/shoppingHistory">Historial de compras</a></li>
			{/if}
			<form action="/?/logout" method="POST">
				<button formaction="/?/logout">Cerrar Sesion</button>
			</form>
		{:else}
			<li><a href="/">DuliaRodse</a></li>
			<BranchSelection message={'Productos'} />
			<li><a href="/auth/login">Iniciar Sesion</a></li>
			<li><a href="/auth/signup">Registrate</a></li>
		{/if}
	</ul>
</nav>

<slot />
