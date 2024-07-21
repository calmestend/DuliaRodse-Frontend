import type { Client, ClientServerData, Session, User, UserServerData } from '../types';
import { writable } from 'svelte/store';

export const usersStores = writable<User[]>([]);
export const sessionsStores = writable<Session[]>([]);
export const clientsStores = writable<Client[]>([]);

fillUsersStores();
fillClientsStores();

export async function fillUsersStores() {
	const response = await fetch('http://localhost/duliarodse/back/api/usuario/read.php');
	const parsedResponse = await response.json();

	const users: UserServerData[] = parsedResponse.data;
	users.map((user) => {
		const newUser: User = {
			id: user?.ID_USU ?? 0,
			name: user?.NOM_USU,
			role: user?.TIPO_USU == 1 ? 'admin' : 'client',
			password: user?.PASS_USU
		};

		usersStores.update((previousUsers) => {
			return [...previousUsers, newUser];
		});
	});
}

export async function fillClientsStores() {
	const response = await fetch('http://localhost/duliarodse/back/api/cliente/read.php');
	const parsedResponse = await response.json();

	const clients: ClientServerData[] = parsedResponse.data;
	clients.map((client) => {
		const newClient: Client = {
			id: client?.ID_CLIE ?? 0,
			name: client?.NI_CLIE,
			firstLastname: client?.AP_CLIE,
			secondLastname: client?.AM_CLIE,
			neighborhood: client?.COL_CLIE,
			street: client?.CALLE_CLIE,
			intNumber: client?.NOINT_CLIE,
			extNumber: client?.NOEXT_CLIE,
			zipCode: client?.CP_CLIE,
			email: client?.EMAIL_CLIE,
			userId: client?.ID_USU ?? 0,
			city: client?.CVE_CIUDAD,
			rfc: client?.RFC_CLIE,
			phoneNumber: client?.TEL_CLIE
		};

		clientsStores.update((previousClients) => {
			return [...previousClients, newClient];
		});
	});
}

export async function updateClient(client: Client) {
	const clientUpdated: ClientServerData = {
		ID_CLIE: client.id,
		NI_CLIE: client.name,
		AP_CLIE: client.firstLastname,
		AM_CLIE: client.secondLastname,
		COL_CLIE: client.neighborhood,
		CALLE_CLIE: client.street,
		NOINT_CLIE: client.intNumber,
		NOEXT_CLIE: client.extNumber,
		CP_CLIE: client.zipCode,
		EMAIL_CLIE: client.email,
		RFC_CLIE: client.rfc,
		TEL_CLIE: client.phoneNumber,
		ID_USU: client.userId,
		CVE_CIUDAD: client.city
	};
	const response = await fetch('http://localhost/duliarodse/back/api/cliente/update.php', {
		body: JSON.stringify(clientUpdated),
		method: 'POST'
	});

	const parsedResponse = await response.json();

	if (parsedResponse.message === 'Post created') {
		await fillClientsStores();
		return { message: 'Cliente actualizado' };
	}

	return {
		message: 'Ocurrio un error en nuestro servidor'
	};
}
