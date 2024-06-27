import { User } from './../../users/types/user';

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