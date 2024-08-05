import { getLastPurchase } from '$lib/payment/queries';
import { generateBillPDF } from '$lib/pdf/bill';
import type { BillPDFDataServerData } from '$lib/types';

// Search bill per saleID
export async function getBill(saleId: number) {
	const response = await fetch(
		'http://localhost/duliarodse/back/api/factura/search_by_cve_venta.php',
		{
			method: 'POST',
			body: JSON.stringify({ CVE_VENTA: saleId })
		}
	);

	const parsedResponse = await response.json();
	const billData: BillPDFDataServerData[] = parsedResponse.data;

	return billData;
}

export async function createBillPDF(clientId: number) {
	const purchase = await getLastPurchase(clientId);

	if (purchase) {
		const billPDFData: BillPDFDataServerData[] = await getBill(purchase.CVE_VENTA);
		return generateBillPDF(billPDFData);
	}
}
