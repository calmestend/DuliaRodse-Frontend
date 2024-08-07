<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<main>
	<h1>Inicia Sesión {'>ᴗ<'}</h1>
	<form action="/auth/login" method="POST">
		<input
			type="text"
			name="username"
			placeholder="Nombre de usuario"
			value={form?.username ?? ''}
		/>
		<input type="password" name="password" placeholder="Contraseña" value={form?.password ?? ''} />

		{#if form?.message}
			<p class="error-message">{form.message}</p>
		{/if}

		<div class="button-container">
			<button
				type="button"
				class="btn signup"
				on:click={() => {
					goto('/auth/signup');
				}}>Registrar</button
			>
			<button class="btn submit" type="submit">Iniciar Sesión</button>
		</div>
	</form>
</main>

<style lang="scss">
	/* Paleta de colores */
	$primary-color: #1e1e1e; /* Color de texto y botones */
	$background-color: #ffffff; /* Fondo blanco para el formulario */
	$accent-color: #f0f8ff; /* Color de acento para botones y detalles */

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	h1 {
		color: $primary-color;
		margin-bottom: 1rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Sombra sutil */
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
		max-width: 400px;
		width: 100%;
		margin: auto;
	}

	input {
		border: 1px solid $primary-color;
		font-size: 1rem;
		color: $primary-color;
		margin-bottom: 1rem;
		width: 100%;
	}

	input::placeholder {
		color: $primary-color;
	}

	.error-message {
		color: red;
		font-size: 0.875rem;
		margin-bottom: 1rem;
	}

	.button-container {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.submit {
		background-color: $accent-color;
		color: $primary-color;
	}

	.signup {
		background-color: $primary-color;
		color: $accent-color;
		border: 1px solid $primary-color;
	}
</style>
