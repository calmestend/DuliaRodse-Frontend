import type { ClientServerData, Session, User } from '../types';
import { v4 as uuid } from 'uuid';
import { get } from 'svelte/store';
import { clientsStores, sessionsStores, usersStores } from './stores';
import { validationClientRegex, validationString } from './validations';
import { createClientQuery } from './queries';

function createSessionById(userId: number) {
	const users = get(usersStores);
	const user = users.find((user) => user.id === userId);

	if (!user) throw new Error('Usuario no encontrado');

	const newSession: Session = {
		id: uuid(),
		userId: user.id,
		userRole: user.role
	};

	sessionsStores.update((previousSessions) => {
		const filteredSessions = previousSessions.filter((session) => session.userId !== userId);
		return [...filteredSessions, newSession];
	});

	return newSession;
}

export async function createClient(client: ClientServerData, username: string, password: string) {
	validationClientRegex(client, username, password);

	let currentUsers = get(usersStores);
	console.log(currentUsers);
	const currentClients = get(clientsStores);
	console.log(currentClients);

	const duplicateName = currentUsers.find((user) => user.name === username);
	if (duplicateName) throw new Error('Ya existe este usuario');

	const duplicateEmail = currentClients.find((cli) => cli.email === client.EMAIL_CLIE);
	if (duplicateEmail) throw new Error('Este email ya pertenece a un usuario');

	const duplicatePhoneNumber = currentClients.find((cli) => cli.phoneNumber === client.TEL_CLIE);
	if (duplicatePhoneNumber) throw new Error('Este numero telefonico ya pertenece a un usuario');

	await createClientQuery(client, username, password);

	currentUsers = get(usersStores);
	console.log(currentUsers);

	const currentUser: User | undefined = currentUsers.find((user) => {
		if (user.name === username) {
			return user.id;
		}
	});

	return createSessionById(currentUser?.id ?? 0);
}

export async function createSessionByUsername(username: string, password: string) {
	const usernameValidationResult = validationString(username);
	if (usernameValidationResult.error) {
		throw new Error('Nombre de usuario invalido');
	}

	const currentUsers = get(usersStores);
	const userFound = currentUsers.find((user) => {
		return user.name === username && user.password === password;
	});
	if (!userFound) {
		const userWithSameUsername = currentUsers.find((user) => user.name === username);

		if (userWithSameUsername) {
			throw new Error('Contrasena incorrecta');
		}
		throw new Error('Usuario no encontrado');
	}

	return createSessionById(userFound.id);
}

export function signOut(id: string) {
	const sessions = get(sessionsStores);
	const sessionFound = sessions.find((session) => session.id === id);

	if (!sessionFound) throw new Error('Sesion no encontrada');

	sessionsStores.update((previousSessions) => {
		return previousSessions.filter((session) => session != sessionFound);
	});
}
