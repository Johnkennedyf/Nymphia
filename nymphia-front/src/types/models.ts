export class User {
	id: string;
	name?: string;
	description?: string;
	cpf?: string;
	email: string;
	password: string;
	birth?: Date;
	phone?: string;
	portfolios: Portfolio[];
	created_at: Date;
	updated_at: Date;
}

export class Portfolio {
	id: string;
	name: string;
	description: string;
	img: string;
	user_id: string;
	user: User;
	created_at: Date;
	updated_at: Date;
}
