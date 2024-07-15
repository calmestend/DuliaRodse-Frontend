<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<h1>Registrate</h1>

<form action="/auth/signup" method="POST">
	<input type="text" name="username" placeholder="Nombre de usuario" value={form?.username ?? ''} />
	<br />
	<input type="text" name="name" placeholder="Nombre" value={form?.name ?? ''} />
	<br />
	<input
		type="text"
		name="firstLastname"
		placeholder="Apellido Paterno"
		value={form?.firstLastname ?? ''}
	/>
	<br />
	<input
		type="text"
		name="secondLastname"
		placeholder="Apellido Materno"
		value={form?.secondLastname ?? ''}
	/>
	<br />
	<input type="email" name="email" placeholder="Email" value={form?.email ?? ''} />
	<br />
	<input
		type="text"
		name="phoneNumber"
		placeholder="Numero telefonico"
		value={form?.phoneNumber ?? ''}
	/>
	<br />
	<input type="password" name="password" placeholder="Contrasena" value={form?.password ?? ''} />
	<br />

	{#if form?.message}
		<p>{form.message}</p>
	{/if}

	<button>Registrar</button>
</form>
