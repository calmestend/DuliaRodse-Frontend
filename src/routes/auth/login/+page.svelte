<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<h1>Inicia Sesion {'>ᴗ<'}</h1>

<form action="/auth/login" method="POST">
	<input type="text" name="username" placeholder="Nombre de usuario" value={form?.username ?? ''} />
	<input type="password" name="password" placeholder="Contrasena" value={form?.password ?? ''} />

	{#if form?.message}
		<p>{form.message}</p>
	{/if}

	<div class="button-container">
		<button
			type="button"
			class="btn signup"
			on:click={() => {
				goto('/auth/signup');
			}}>Registrar</button
		>
		<button class="btn submit" type="submit">Iniciar Sesion</button>
	</div>
</form>

<style lang="scss">
	.button-container {
		display: flex;

		.submit {
			background-color: #f0f8ff;
			color: #111;
		}

		.signup {
			background-color: #111;
			border: 1px solid #000;
			color: #f0f8ff;
		}
	}
</style>
