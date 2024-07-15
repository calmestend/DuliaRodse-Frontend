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
