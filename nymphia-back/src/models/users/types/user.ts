import { Portfolio } from "src/models/portfolios/types/portfolio";

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