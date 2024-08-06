import type { ProductInventory } from '$lib/types';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export function createProductsInventoryReport(products: ProductInventory[]) {
	pdfMake.vfs = pdfFonts.pdfMake.vfs;

	const document: TDocumentDefinitions = {
		content: [
			{ text: 'Reporte', style: 'header' },
			'DuliaRodse S.A de C.V',
			{ text: 'Inventario', style: 'subheader' },
			{
				style: 'inventory',
				table: {
					body: [
						['Producto ID', 'Numero de Sucursal', 'Numero de Inventario', 'Existencia'],
						...products.map((product) => [
							product.id,
							product.branchId,
							product.inventoryId,
							product.existence
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
