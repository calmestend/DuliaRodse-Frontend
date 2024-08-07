<script lang="ts">
	import { disableBranch, enableBranch, updateBranch } from '$lib/inventory/queries';
	import type { Branch, BranchServer } from '$lib/types';

	export let branch: BranchServer;
	export let branches: Branch[];

	let editing = false;
	let branchToEdit: BranchServer | null = null;
	let errorMessage = '';

	const currentBranch = branches.find((currentBranch) => currentBranch.id === branch.id);

	function startEditing(branch: BranchServer) {
		editing = true;
		branchToEdit = branch;
	}

	function stopEditing() {
		editing = false;
		branchToEdit = null;
		errorMessage = ''; // Limpiar mensaje de error al detener la edición
	}

	function applyChanges() {
		if (branchToEdit) {
			if (parseInt(branchToEdit.intNumber) < 0) {
				errorMessage = 'El número interior no puede ser menor a 0.';
				branchToEdit.intNumber = '0';
				return;
			}

			if (isNaN(parseInt(branchToEdit.extNumber)) || parseInt(branchToEdit.extNumber) < 0) {
				errorMessage = 'El número exterior no puede ser menor a 0.';
				branchToEdit.extNumber = '0';
				return;
			}

			if (!branchToEdit.neighborhood.trim()) {
				errorMessage = 'La colonia no puede estar vacía.';
				return;
			}
			if (!branchToEdit.street.trim()) {
				errorMessage = 'La calle no puede estar vacía.';
				return;
			}
			if (!branchToEdit.zipCode.trim()) {
				errorMessage = 'El código postal no puede estar vacío.';
				return;
			}

			updateBranch(branchToEdit);
			stopEditing();
		}
	}

	function validateNumberInput(event: Event, field: 'intNumber' | 'extNumber') {
		const input = event.target as HTMLInputElement;
		let value = parseFloat(input.value) + '';
		if (parseInt(value) < 0) {
			value = '0';
		}
		branch[field] = value;
	}

	function validateZipCode(event: Event) {
		const input = event.target as HTMLInputElement;
		branch.zipCode = input.value.trim();
	}
</script>

<div class="branch-card">
	<h2 id="branch">{currentBranch?.cityName}, {currentBranch?.stateName}</h2>
	<p>Numero de sucursal: {branch.id}</p>
	<p>{branch.active ? 'Sucursal activa' : 'Sucursal inactiva'}</p>

	<div class="branch-details">
		<div class="detail">
			<label for="neighborhood">Colonia</label>
			<input
				type="text"
				bind:value={branch.neighborhood}
				name="neighborhood"
				disabled={!editing || branchToEdit !== branch}
			/>
		</div>

		<div class="detail">
			<label for="street">Calle</label>
			<input
				type="text"
				bind:value={branch.street}
				name="street"
				disabled={!editing || branchToEdit !== branch}
			/>
		</div>

		<div class="detail">
			<label for="intNumber">Numero Interior</label>
			<input
				type="number"
				bind:value={branch.intNumber}
				name="intNumber"
				min="0"
				on:input={(event) => validateNumberInput(event, 'intNumber')}
				disabled={!editing || branchToEdit !== branch}
			/>
		</div>

		<div class="detail">
			<label for="extNumber">Numero Exterior</label>
			<input
				type="number"
				bind:value={branch.extNumber}
				name="extNumber"
				min="0"
				on:input={(event) => validateNumberInput(event, 'extNumber')}
				disabled={!editing || branchToEdit !== branch}
			/>
		</div>

		<div class="detail">
			<label for="zipCode">Codigo Postal</label>
			<input
				type="text"
				bind:value={branch.zipCode}
				name="zipCode"
				on:input={validateZipCode}
				disabled={!editing || branchToEdit !== branch}
			/>
		</div>
	</div>

	{#if errorMessage}
		<p class="error-message">{errorMessage}</p>
	{/if}

	<div class="buttons">
		{#if editing && branchToEdit === branch}
			<button class="btn" type="button" on:click={applyChanges}>Aplicar cambios</button>
			<button class="btn" type="button" on:click={stopEditing}>Cancelar</button>
		{:else}
			<button class="btn" type="button" on:click={() => startEditing(branch)}>Actualizar</button>
		{/if}
		{#if branch.active}
			<button class="btn" type="button" on:click={() => disableBranch(branch.id)}>Desactivar</button
			>
		{:else}
			<button class="btn" type="button" on:click={() => enableBranch(branch.id)}>Activar</button>
		{/if}
	</div>
</div>

<style lang="scss">
	.branch-card {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
	}

	.branch-details {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.detail {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.detail label {
		font-weight: bold;
	}

	.detail input {
		font-size: 1rem;
	}

	.error-message {
		color: red;
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
	}
</style>
