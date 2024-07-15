import type { Client, ClientServerData, Session, User, UserServerData } from '../types';
import { writable } from 'svelte/store';

export const usersStores = writable<User[]>([]);
export const sessionsStores = writable<Session[]>([]);
export const clientsStores = writable<Client[]>([]);

usersStores.subscribe(console.log);
clientsStores.subscribe(console.log);

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
