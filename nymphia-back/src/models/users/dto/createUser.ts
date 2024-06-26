import { IsDate, IsEmail, IsNotEmpty, IsOptional, Length,  } from "class-validator"

export class CreateUserDTO {
	@IsOptional()
	name: string;

	@IsOptional()
	@Length(11)
	cpf: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	password: string;

	@IsOptional()
	@IsDate()
	birth: Date;

	@IsOptional()
	phone: string;
}