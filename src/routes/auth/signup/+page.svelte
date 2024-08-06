<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<h1>Registrate ૮ ˶ᵔ ᵕ ᵔ˶ ა</h1>

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
			placeholder="Numero telefonico"
			value={form?.phoneNumber ?? ''}
		/>
		<input type="password" name="password" placeholder="Contrasena" value={form?.password ?? ''} />

		{#if form?.message}
			<p>{form.message}</p>
		{/if}

		<div class="button-container">
			<button
				type="button"
				class="btn login"
				on:click={() => {
					goto('/auth/login');
				}}>Iniciar Sesion</button
			>
			<button class="btn submit" type="submit">Registrar</button>
		</div>
	</form>
</div>

<style lang="scss">
	.button-container {
		display: flex;

		.submit {
			background-color: #f0f8ff;
			color: #111;
		}

		.login {
			background-color: #111;
			border: 1px solid #000;
			color: #f0f8ff;
		}
	}
</style>
