<script lang="ts">
	import BranchSelection from '$lib/components/BranchSelection.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<nav>
	<ul>
		<li><a href="/">DuliaRodse</a></li>
		<BranchSelection message={'Productos'} />
		{#if data.authenticated}
			<li><a href="/shoppingCart">Carrito de compras</a></li>
			<form action="/?/logout" method="POST">
				<button formaction="/?/logout">Log Out</button>
			</form>
		{:else}
			<li><a href="/auth/login">Iniciar Sesion</a></li>
			<li><a href="/auth/signup">Registrate</a></li>
		{/if}
	</ul>
</nav>

<slot />
