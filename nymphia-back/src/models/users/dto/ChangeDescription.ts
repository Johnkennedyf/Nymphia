import { IsNotEmpty, IsString } from "class-validator"

export class ChangeDescriptionDTO {
	@IsString()
	description: string;
}