import type { BillPDFDataServerData } from '$lib/types';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export function generateBillPDF(billData: BillPDFDataServerData[]) {
	pdfMake.vfs = pdfFonts.pdfMake.vfs;

	const billId = billData[0].CVE_FACTURA;
	const saleId = billData[0].CVE_VENTA;
	const date = billData[0].FEC_VENTA;

	const client = {
		name: billData[0].NI_CLIE,
		firstLastName: billData[0].AP_CLIE,
		secondLastName: billData[0].AM_CLIE,
		neighborhood: billData[0].COL_CLIE,
		street: billData[0].CALLE_CLIE,
		intNumber: billData[0].NOINT_CLIE,
		extNumber: billData[0].NOEXT_CLIE,
		zipCode: billData[0].CP_CLIE,
		city: billData[0].NOM_CIUDAD,
		state: billData[0].NOM_ESTADO,
		rfc: billData[0].RFC_CLIE
	};

	const purchaseId = billData[0].CVE_PAGO;
	const purchaseAmount = billData[0].CANT_PAGO;
	const purchaseType = billData[0].TIP_PAGO;
	const saleAmount = billData[0].PAGO_VENTA;

	const document: TDocumentDefinitions = {
		content: [
			{ text: 'Factura', style: 'billInformation' },
			'DuliaRodse S.A de C.V',
			'N° de Factura: ' + billId,
			'Fecha: ' + date,
			'N° de Venta: ' + saleId,
			{ text: 'Facturar a:', style: 'billInformation' },
			`Nombre: ${client.name} ${client.firstLastName} ${client.secondLastName}`,
			`RFC: ${client.rfc}`,
			'Direccion:',
			`${client.neighborhood}, ${client.street}, ${client.intNumber} ${client.extNumber}`,
			`${client.zipCode}, ${client.city} ${client.state}`,
			{
				style: 'products',
				table: {
					body: [
						['Cantidad', 'Producto', 'Precio Unitario', 'Importe'],
						...billData.map((product) => [
							product.CANT_PRO,
							product.NOM_PRO,
							(parseFloat(product.PREC_PRO) / 1.16).toFixed(2),
							(parseFloat(product.IMPORTE) / 1.16).toFixed(2)
						])
					]
				}
			},
			{ text: `Subtotal: ${(parseFloat(saleAmount) / 1.16).toFixed(2)}` },
			`Iva 16%: ${((parseFloat(saleAmount) / 1.16) * 0.16).toFixed(2)}`,
			`TOTAL: ${saleAmount}`,
			{ text: 'Pago:' },
			{ text: `N° de Pago: ${purchaseId}` },
			{ text: `Fecha de Pago: ${date}` },
			{ text: `Cantidad Pagada: ${purchaseAmount}` },
			{ text: `Metodo de pago: ${purchaseType}` }
		]
	};

	try {
		pdfMake.createPdf(document).open();
	} catch (error) {
		console.error('error', error);
	}
}
