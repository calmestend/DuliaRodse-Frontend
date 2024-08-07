<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<main>
	<h1>Regístrate ૮ ˶ᵔ ᵕ ᵔ˶ ა</h1>
	<div class="form-container">
		<form action="/auth/signup" method="POST">
			<input
				type="text"
				name="username"
				placeholder="Nombre de usuario"
				value={form?.username ?? ''}
			/>
			<input type="text" name="name" placeholder="Nombre" value={form?.name ?? ''} />
			<input
				type="text"
				name="firstLastname"
				placeholder="Apellido Paterno"
				value={form?.firstLastname ?? ''}
			/>
			<input
				type="text"
				name="secondLastname"
				placeholder="Apellido Materno"
				value={form?.secondLastname ?? ''}
			/>
			<input type="email" name="email" placeholder="Email" value={form?.email ?? ''} />
			<input
				type="text"
				name="phoneNumber"
				placeholder="Número telefónico"
				value={form?.phoneNumber ?? ''}
			/>
			<input
				type="password"
				name="password"
				placeholder="Contraseña"
				value={form?.password ?? ''}
			/>

			{#if form?.message}
				<p class="error-message">{form.message}</p>
			{/if}

			<div class="button-container">
				<button
					type="button"
					class="btn login"
					on:click={() => {
						goto('/auth/login');
					}}>Iniciar Sesión</button
				>
				<button class="btn submit" type="submit">Registrar</button>
			</div>
		</form>
	</div>
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

	.form-container {
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

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}

	input::placeholder {
		color: $primary-color;
	}

	.error-message {
		color: red;
		font-size: 0.875rem;
	}

	.button-container {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	.submit {
		background-color: $accent-color;
		color: $primary-color;
	}

	.login {
		background-color: $primary-color;
		color: $accent-color;
		border: 1px solid $primary-color;
	}
</style>
