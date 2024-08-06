import type { Category } from '$lib/types';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export function createCategoriesReport(categories: Category[]) {
	pdfMake.vfs = pdfFonts.pdfMake.vfs;

	const document: TDocumentDefinitions = {
		content: [
			{ text: 'Reporte', style: 'header' },
			'DuliaRodse S.A de C.V',
			{ text: 'Categorias', style: 'subheader' },
			{
				style: 'category',
				table: {
					body: [['ID', 'Nombre'], ...categories.map((category) => [category.id, category.name])]
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
