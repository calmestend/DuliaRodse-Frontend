import type { Category } from '$lib/types';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export function createCategoriesReport(categories: Category[]) {
	pdfMake.vfs = pdfFonts.pdfMake.vfs;

	const document: TDocumentDefinitions = {
		content: [
			{ text: 'Reporte', style: 'header' },
			{ text: 'DuliaRodse S.A de C.V', style: 'subheader' },
			{ text: 'Categorías', style: 'subheader' },
			{
				style: 'table',
				table: {
					widths: ['auto', '*'],
					body: [
						[
							{ text: 'ID', style: 'tableHeader' },
							{ text: 'Nombre', style: 'tableHeader' }
						],
						...categories.map((category) => [category.id, category.name])
					]
				}
			}
		],
		styles: {
			header: {
				fontSize: 18,
				bold: true,
				margin: [0, 10, 0, 10],
				color: '#1e1e1e'
			},
			subheader: {
				fontSize: 14,
				bold: true,
				margin: [0, 5, 0, 5],
				color: '#1e1e1e'
			},
			table: {
				margin: [0, 10, 0, 10]
			},
			tableHeader: {
				bold: true,
				fontSize: 13,
				color: '#ffffff',
				fillColor: '#1e1e1e'
			}
		},
		defaultStyle: {
			fontSize: 12,
			color: '#1e1e1e'
		}
	};

	try {
		pdfMake.createPdf(document).open();
	} catch (error) {
		console.error('error', error);
	}
}
