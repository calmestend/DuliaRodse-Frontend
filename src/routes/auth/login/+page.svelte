<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<h1>Inicia Sesion</h1>

<form action="/auth/login" method="POST">
	<input type="text" name="username" placeholder="Nombre de usuario" value={form?.username ?? ''} />
	<br />
	<input type="password" name="password" placeholder="Contrasena" value={form?.password ?? ''} />
	<br />

	{#if form?.message}
		<p>{form.message}</p>
	{/if}

	<button>Iniciar Sesion</button>
</form>
<button
	on:click={() => {
		goto('/auth/signup');
	}}>Registrar</button
>
