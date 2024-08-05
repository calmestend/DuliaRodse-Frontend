// TODO: Explain every type in the wiki

export type UserServerData = {
	ID_USU: number | undefined;
	NOM_USU: string;
	TIPO_USU: number;
	PASS_USU: string;
};

export type User = {
	id: number;
	name: string;
	role: string;
	password: string;
};

export type ClientServerData = {
	ID_CLIE: number | null;
	NI_CLIE: string;
	AP_CLIE: string;
	AM_CLIE: string;
	COL_CLIE: string | undefined;
	CALLE_CLIE: string | undefined;
	NOINT_CLIE: string | undefined;
	NOEXT_CLIE: string | undefined;
	CP_CLIE: string | undefined;
	EMAIL_CLIE: string;
	ID_USU: number | null;
	CVE_CIUDAD: number | undefined;
	RFC_CLIE: string | undefined;
	TEL_CLIE: string;
};

export type Client = {
	id: number;
	name: string;
	firstLastname: string;
	secondLastname: string;
	neighborhood: string | undefined;
	street: string | undefined;
	intNumber: string | undefined;
	extNumber: string | undefined;
	zipCode: string | undefined;
	email: string;
	userId: number;
	city: number | undefined;
	rfc: string | undefined;
	phoneNumber: string;
};

export type Session = {
	id: string;
	userId: number;
	userRole: string;
};

export type BranchServerData = {
	NO_SUC: number;
	COL_SUC: string;
	CALLE_SUC: string;
	NOINT_SUC: string;
	NOEXT_SUC: string;
	CP_SUC: string;
	NOM_CIUDAD: string;
	NOM_ESTADO: string;
};

export type BranchServerLoad = {
	NO_SUC: number;
	COL_SUC: string;
	CALLE_SUC: string;
	NOINT_SUC: string;
	NOEXT_SUC: string;
	CP_SUC: string;
	CVE_CIUDAD: number;
};

export type Branch = {
	id: number;
	neighborhood: string;
	street: string;
	intNumber: string;
	extNumber: string;
	zipCode: string;
	cityName: string;
	stateName: string;
};

export type ProductInventoryServerData = {
	NO_SUC: number;
	NO_INV: number;
	EXIST_INV: string;
	ID_PRO: number;
	NOM_PRO: string;
	GRAM_PRO: string;
	COS_PRO: string;
	PREC_PRO: string;
	IMG_PRO: string;
	NOM_CAT: string;
	AROMA_PRO: string;
	ACTIVO: number;
};

export interface ProductInventory {
	branchId: number;
	inventoryId: number;
	existence: number;
	id: number;
	name: string;
	grammage: number;
	cost: number;
	price: number;
	img: string;
	nameCategorie: string;
	scent: string;
	active: boolean;
}

export interface ProductShoppingCart extends ProductInventory {
	quantity: number;
}

export type CityServerData = {
	CVE_CIUDAD: number;
	NOM_CIUDAD: string;
	CVE_ESTADO: number;
};

export type City = {
	id: number;
	stateId: number;
	name: string;
};

export type StateServerData = {
	CVE_ESTADO: number;
	NOM_ESTADO: string;
};

export type State = {
	id: number;
	name: string;
};

export type SaleServerData = {
	CVE_VENTA: number;
	FEC_VENTA: string;
	PAGO_VENTA: string;
	ID_CLIE: number;
};

export type PaymentServerData = {
	CVE_PAGO: number;
	FEC_PAGO: string;
	CANT_PAGO: string;
	TIP_PAGO: string;
	CVE_VENTA: number;
};

export type SaleInventoryServerData = {
	CVE_VENTA: number;
	NO_INV: number;
	CANT_PRO: number;
};

export type PurchaseRecordServerData = {
	CVE_VENTA: number;
	ID_CLIE: number;
	FEC_VENTA: string;
	NO_INV: number;
	ID_PRO: number;
	NOM_PRO: string;
	PREC_PRO: string;
	CANT_PRO: number;
	PAGO_VENTA: string;
};

export type PurchaseRecord = {
	saleId: number;
	clientId: number;
	saleDate: string;
	inventoryId: number;
	productId: number;
	productName: string;
	productPrice: number;
	productQuantity: number;
	amount: number;
};

export type ReviewServerData = {
	ID_REV: number;
	ID_ESC: number;
	ID_CLIE: number;
	ID_PRO: number;
	COM_REV: string;
};

export type Review = {
	id: number;
	scaleId: number;
	clientId: number;
	productId: number;
	commentary: string;
};

export type BillServerData = {
	CVE_FACTURA: number;
	FEC_FACTURA: string;
	CVE_VENTA: number;
};

export type BillPDFDataServerData = {
	ID_CLIE: number;
	NI_CLIE: string;
	AP_CLIE: string;
	AM_CLIE: string;
	COL_CLIE: string;
	CALLE_CLIE: string;
	NOINT_CLIE: string;
	NOEXT_CLIE: string;
	CP_CLIE: string;
	EMAIL_CLIE: string;
	RFC_CLIE: string;
	NOM_CIUDAD: string;
	NOM_ESTADO: string;
	CVE_VENTA: number;
	FEC_VENTA: string;
	PAGO_VENTA: string;
	CVE_PAGO: number;
	CANT_PAGO: string;
	TIP_PAGO: string;
	CVE_FACTURA: number;
	CANT_PRO: number;
	NO_INV: number;
	ID_PRO: number;
	NOM_PRO: string;
	PREC_PRO: string;
	IMPORTE: string;
};

export type BillPDFData = {
	clientId: number;
	clientName: string;
	clientFirstLastname: string;
	clientSecondLastname: string;
	clientNeighborhood: string;
	clientStreet: string;
	clientIntNumber: string;
	clientExtNumber: string;
	clientZipCode: string;
	clientEmail: string;
	clientCity: string;
	clientState: string;
	clientRfc: string;
	saleId: number;
	date: string;
	saleAmount: string;
	paymentId: number;
	paymentAmount: string;
	paymentType: string;
	billId: number;
	productQuantity: number;
	productInventoryId: number;
	productId: number;
	productName: string;
	productPrice: string;
	import: string;
};

export type ProductServerData = {
	ID_PRO: number;
	NOM_PRO: string;
	GRAM_PRO: string;
	COS_PRO: string;
	PREC_PRO: string;
	IMG_PRO: string;
	ID_CAT: number;
	AROMA_PRO: string;
	ACTIVO: number;
};

export type Product = {
	id: number;
	name: string;
	grammage: number;
	cost: number;
	price: number;
	img: string;
	categorieId: number;
	scent: string;
	active: boolean;
};
