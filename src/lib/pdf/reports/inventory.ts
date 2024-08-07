import type { ProductInventory } from '$lib/types';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export function createProductsInventoryReport(products: ProductInventory[]) {
	pdfMake.vfs = pdfFonts.pdfMake.vfs;

	const document: TDocumentDefinitions = {
		content: [
			{ text: 'Reporte', style: 'header' },
			{ text: 'DuliaRodse S.A de C.V', style: 'subheader' },
			{ text: 'Inventario', style: 'subheader' },
			{
				style: 'table',
				table: {
					widths: ['auto', 'auto', 'auto', 'auto'],
					body: [
						[
							{ text: 'Producto ID', style: 'tableHeader' },
							{ text: 'Número de Sucursal', style: 'tableHeader' },
							{ text: 'Número de Inventario', style: 'tableHeader' },
							{ text: 'Existencia', style: 'tableHeader' }
						],
						...products.map((product) => [
							product.id,
							product.branchId,
							product.inventoryId,
							product.existence
						])
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
