import type { Product } from '$lib/types';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export function createProductsReport(products: Product[]) {
	pdfMake.vfs = pdfFonts.pdfMake.vfs;

	const document: TDocumentDefinitions = {
		content: [
			{ text: 'Reporte', style: 'header' },
			'DuliaRodse S.A de C.V',
			{ text: 'Productos', style: 'subheader' },
			{
				style: 'products',
				table: {
					body: [
						[
							'ID',
							'Nombre',
							'Gramaje',
							'Costo',
							'Precio',
							'Nombre imagen',
							'Categoria ID',
							'Aroma',
							'Activo'
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
		]
	};

	try {
		pdfMake.createPdf(document).open();
	} catch (error) {
		console.error('error', error);
	}
}
