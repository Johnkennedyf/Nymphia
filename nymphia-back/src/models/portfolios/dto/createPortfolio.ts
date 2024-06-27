import { IsNotEmpty, IsOptional, } from "class-validator"

export class CreatePortfolioDTO {
	@IsOptional()
	name: string;

	@IsOptional()
	description: string;

	@IsNotEmpty()
	img: string;

	@IsNotEmpty()
	user_id: string;
}