import type { Product } from '$lib/types';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export function createProductsReport(products: Product[]) {
	pdfMake.vfs = pdfFonts.pdfMake.vfs;

	const document: TDocumentDefinitions = {
		pageOrientation: 'landscape',
		content: [
			{ text: 'Reporte', style: 'header' },
			{ text: 'DuliaRodse S.A de C.V', style: 'subheader' },
			{ text: 'Productos', style: 'subheader' },
			{
				style: 'table',
				table: {
					widths: [20, 80, 60, 60, 60, 150, 60, 50, 60],
					body: [
						[
							{ text: 'ID', style: 'tableHeader' },
							{ text: 'Nombre', style: 'tableHeader' },
							{ text: 'Gramaje', style: 'tableHeader' },
							{ text: 'Costo', style: 'tableHeader' },
							{ text: 'Precio', style: 'tableHeader' },
							{ text: 'Nombre imagen', style: 'tableHeader' },
							{ text: 'Categoria ID', style: 'tableHeader' },
							{ text: 'Aroma', style: 'tableHeader' },
							{ text: 'Activo', style: 'tableHeader' }
						],
						...products.map((product) => [
							product.id,
							product.name,
							product.grammage,
							product.cost,
							product.price,
							product.img,
							product.categoryId,
							product.scent,
							product.active ? 'activo' : 'inactivo'
						])
					]
				}
			}
		],
		styles: {
			header: {
				fontSize: 16,
				bold: true,
				color: '#1e1e1e'
			},
			subheader: {
				fontSize: 18,
				bold: true,
				color: '#1e1e1e'
			},
			table: {},
			tableHeader: {
				bold: true,
				fontSize: 14,
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
