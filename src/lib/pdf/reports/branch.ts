import type { BranchServer } from '$lib/types';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export function createBranchesReport(branches: BranchServer[]) {
	pdfMake.vfs = pdfFonts.pdfMake.vfs;

	const document: TDocumentDefinitions = {
		content: [
			{ text: 'Reporte', style: 'header' },
			'DuliaRodse S.A de C.V',
			{ text: 'Sucursales', style: 'subheader' },
			{
				style: 'branch',
				table: {
					body: [
						[
							'Numero Sucursal',
							'Clave Ciudad',
							'Colonia',
							'Calle',
							'Codigo Postal',
							'Numero Interior',
							'Numero Exterior',
							'Activo'
						],
						...branches.map((branch) => [
							branch.id,
							branch.city,
							branch.neighborhood,
							branch.street,
							branch.zipCode,
							branch.intNumber,
							branch.extNumber,
							branch.active ? 'activo' : 'inactivo'
						])
					]
				}
			}
		]
	};

	try {
		pdfMake.createPdf(document).open();
	} catch (error) {
		console.error('error', error);
	}
}
