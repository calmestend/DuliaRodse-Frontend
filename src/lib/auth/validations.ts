// TODO: Change message orthography

import { get } from 'svelte/store';
import type { ClientServerData, Session, User } from '../types';
import { sessionsStores, usersStores } from './stores';

export function validationString(string: string) {
	const stringRegex = /^[a-zA-Z0-9\s]+$/;
	const stringRegexExec = stringRegex.exec(string);

	if (stringRegexExec && stringRegexExec[0] === string) {
		return {
			success: true
		};
	}

	return {
		error: true,
		message: 'La cadena de texto invalida'
	};
}

export function validationPhoneNumber(phoneNumber: string) {
	const phoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	const phoneNumberRegexExec = phoneNumberRegex.exec(phoneNumber);

	if (phoneNumberRegexExec && phoneNumberRegexExec[0] === phoneNumber) {
		return {
			success: true
		};
	}

	return {
		error: true,
		message: 'El numero telefonico es invalido'
	};
}

export function validationEmail(email: string) {
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const emailRegexExec = emailRegex.exec(email);

	if (emailRegexExec && emailRegexExec[0] === email) {
		return {
			success: true
		};
	}

	return {
		error: true,
		message: 'El email es invalido'
	};
}

export function validationPassword(password: string) {
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&:()])[A-Za-z\d@$!%*?&]{8,}$/;
	const passwordRegexExec = passwordRegex.exec(password);

	if (passwordRegexExec && passwordRegexExec[0] === password) {
		return {
			success: true
		};
	}

	return {
		error: true,
		message:
			'La contrasena debe contar con al menos 8 caracteres, una letra minuscula (`a-z`), al menos una letra mayuscula (`A-Z`), al menos un digito (`0-9`), al menos un caracter especial '
	};
}

export function validationClientRegex(
	client: ClientServerData,
	username: string,
	password: string
) {
	const usernameValidationResult = validationString(username);
	if (usernameValidationResult.error) {
		throw new Error('Nombre de usuario invalido');
	}

	const nameValidationResult = validationString(client.NI_CLIE);
	if (nameValidationResult.error) {
		throw new Error('Nombre invalido');
	}

	const firstLastnameValidationResult = validationString(client.AP_CLIE);
	if (firstLastnameValidationResult.error) {
		throw new Error('Apellido Paterno invalido');
	}

	const secondLastnameValidationResult = validationString(client.AM_CLIE);
	if (secondLastnameValidationResult.error) {
		throw new Error('Apellido Materno invalido');
	}

	const emailValidationResult = validationEmail(client.EMAIL_CLIE);
	if (emailValidationResult.error) {
		throw new Error(emailValidationResult.message);
	}

	const passwordValidationResult = validationPassword(password);
	if (passwordValidationResult.error) {
		throw new Error(passwordValidationResult.message);
	}
}
export function validationSession(id: string) {
	const sessions: Session[] = get(sessionsStores);
	const sessionResult = sessions.find((session) => session.id === id);

	if (!sessionResult) throw new Error('La sesion no existe');

	const users: User[] = get(usersStores);
	const userResult = users.find((user) => user.id === sessionResult.userId);

	if (!userResult) throw new Error('El usuario no existe');

	return {
		sessionResult,
		userResult
	};
}
