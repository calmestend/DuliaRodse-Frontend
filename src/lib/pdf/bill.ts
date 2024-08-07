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
			{ text: 'Factura', style: 'header' },
			{ text: 'DuliaRodse S.A de C.V', style: 'subheader' },
			{ text: `N° de Factura: ${billId}`, style: 'subheader' },
			{ text: `Fecha: ${date}`, style: 'subheader' },
			{ text: `N° de Venta: ${saleId}`, style: 'subheader' },
			{ text: 'Facturar a:', style: 'header' },
			`Nombre: ${client.name} ${client.firstLastName} ${client.secondLastName}`,
			`RFC: ${client.rfc}`,
			'Dirección:',
			`${client.neighborhood}, ${client.street}, ${client.intNumber} ${client.extNumber}`,
			`${client.zipCode}, ${client.city} ${client.state}`,
			{
				style: 'table',
				table: {
					widths: ['auto', '*', 'auto', 'auto'],
					body: [
						[
							{ text: 'Cantidad', style: 'tableHeader' },
							{ text: 'Producto', style: 'tableHeader' },
							{ text: 'Precio Unitario', style: 'tableHeader' },
							{ text: 'Importe', style: 'tableHeader' }
						],
						...billData.map((product) => [
							product.CANT_PRO,
							product.NOM_PRO,
							(parseFloat(product.PREC_PRO) / 1.16).toFixed(2),
							(parseFloat(product.IMPORTE) / 1.16).toFixed(2)
						])
					]
				}
			},
			{ text: `Subtotal: ${(parseFloat(saleAmount) / 1.16).toFixed(2)}`, style: 'subheader' },
			{
				text: `IVA 16%: ${((parseFloat(saleAmount) / 1.16) * 0.16).toFixed(2)}`,
				style: 'subheader'
			},
			{ text: `TOTAL: ${saleAmount}`, style: 'subheader' },
			{ text: 'Pago:', style: 'header' },
			{ text: `N° de Pago: ${purchaseId}`, style: 'subheader' },
			{ text: `Fecha de Pago: ${date}`, style: 'subheader' },
			{ text: `Cantidad Pagada: ${purchaseAmount}`, style: 'subheader' },
			{ text: `Método de pago: ${purchaseType}`, style: 'subheader' }
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
