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
	ID_PRO: string;
	NOM_PRO: string;
	GRAM_PRO: string;
	COS_PRO: string;
	PREC_PRO: string;
	IMG_PRO: string;
	NOM_CAT: string;
	AROMA_PRO: string;
	ACTIVO: number;
};

export type ProductInventory = {
	branchId: number;
	inventoryId: number;
	existence: number;
	id: string;
	name: string;
	grammage: number;
	cost: number;
	price: number;
	img: string;
	nameCategorie: string;
	scent: string;
	active: boolean;
};
