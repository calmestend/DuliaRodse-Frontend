import { signOut } from '$lib/auth/auth';
import { SESSION_COOKIE_NAME } from '$lib/constants';
import { fail, type Actions } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export const actions: Actions = {
	logout: async ({ cookies }) => {
		const sessionId = cookies.get(SESSION_COOKIE_NAME);

		if (!sessionId) return {};

		try {
			signOut(sessionId);
			cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
		} catch (error) {
			if (error instanceof Error) {
				return { message: error.message };
			}
		}

		return {};
	},
	uploadFile: async ({ request }) => {
		const formData = await request.formData();
		let filePath: string | undefined;

		try {
			const file = formData.get('file');

			if (!(file instanceof File)) {
				throw new Error(`file must be a file`);
			}

			if (file.size === 0) {
				throw new Error(`file cannot be empty`);
			}

			const dirname = process.cwd();
			const uploadDir = path.join(dirname, 'static', 'images');

			// Asegúrate de que el directorio exista
			if (!fs.existsSync(uploadDir)) {
				fs.mkdirSync(uploadDir, { recursive: true });
			}

			const fileName = `${Date.now()}-${file.name}`;
			filePath = path.join(uploadDir, fileName);
			const uploadData = await file.arrayBuffer();
			fs.writeFileSync(filePath, new Uint8Array(uploadData));

			// Convertimos la ruta a una URL relativa accesible desde el cliente
			filePath = `/images/${fileName}`;
		} catch (error) {
			if (error instanceof Error) {
				return fail(400, { message: error.message });
			}

			return fail(400, {
				message: 'Unknown error occurred while uploading file'
			});
		}

		if (!filePath) {
			return fail(400, {
				message: 'Unknown error occurred while uploading file'
			});
		}

		return {
			status: 200,
			body: JSON.stringify({
				filePath: filePath
			})
		};
	}
};
