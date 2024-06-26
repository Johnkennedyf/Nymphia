import { IsDate, IsEmail, IsNotEmpty, IsOptional, Length,  } from "class-validator"

export class LoginUserDTO {
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	password: string;
}