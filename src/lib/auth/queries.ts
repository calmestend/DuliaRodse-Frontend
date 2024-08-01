import type { Client, ClientServerData, User, UserServerData } from '../types';
import { usersStores, clientsStores } from './stores';

export async function createClientQuery(
	client: ClientServerData,
	username: string,
	password: string
) {
	const newClient = {
		NOM_USU: username,
		PASS_USU: password,
		NI_CLIE: client.NI_CLIE,
		AP_CLIE: client.AP_CLIE,
		AM_CLIE: client.AM_CLIE,
		EMAIL_CLIE: client.EMAIL_CLIE,
		TEL_CLIE: client.TEL_CLIE
	};

	const resCreateClient = await fetch('http://localhost/duliarodse/back/api/cliente/create.php', {
		method: 'POST',
		body: JSON.stringify(newClient)
	});

	const parsedResCreateClient = await resCreateClient.json();

	if (parsedResCreateClient.message === 'Post created') {
		const getUsers = await fetch('http://localhost/duliarodse/back/api/usuario/read.php');
		const parsedGetUsers = await getUsers.json();
		const users: UserServerData[] = parsedGetUsers.data;

		const userCreated: UserServerData | undefined = users.find((user) => user.NOM_USU === username);
		const user: User = {
			id: userCreated?.ID_USU ?? 0,
			role: userCreated?.TIPO_USU == 1 ? 'admin' : 'client',
			name: userCreated?.NOM_USU ?? '',
			password: userCreated?.PASS_USU ?? ''
		};
		usersStores.update((previousUsers) => {
			return [...previousUsers, user];
		});

		const getClients = await fetch('http://localhost/duliarodse/back/api/cliente/read.php');
		const parsedGetClients = await getClients.json();
		const clients: ClientServerData[] = parsedGetClients.data;

		const clientCreated: ClientServerData | undefined = clients.find(
			(cli) => cli.ID_USU === user.id
		);

		const currentClient: Client = {
			id: clientCreated?.ID_CLIE ?? 0,
			name: clientCreated?.NI_CLIE ?? '',
			firstLastname: clientCreated?.AP_CLIE ?? '',
			secondLastname: clientCreated?.AM_CLIE ?? '',
			neighborhood: clientCreated?.COL_CLIE,
			street: clientCreated?.CALLE_CLIE,
			intNumber: clientCreated?.NOINT_CLIE,
			extNumber: clientCreated?.NOEXT_CLIE,
			zipCode: clientCreated?.CP_CLIE,
			email: clientCreated?.EMAIL_CLIE ?? '',
			userId: clientCreated?.ID_USU ?? 0,
			city: clientCreated?.CVE_CIUDAD,
			rfc: clientCreated?.RFC_CLIE,
			phoneNumber: clientCreated?.TEL_CLIE ?? ''
		};

		clientsStores.update((previousClients) => {
			return [...previousClients, currentClient];
		});
	}
}
