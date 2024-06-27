import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/createUser';
import { User } from '@prisma/client';
import { LoginUserDTO } from './dto/loginUser';
import { ChangeDescriptionDTO } from './dto/changeDescription';

@Controller('users')
export class UsersController {
	constructor(
		private usersService: UsersService
	) {}

	@Post('')
	async createUser(@Body() data: CreateUserDTO): Promise<User> {
		return await this.usersService.create(data);
	}

	@Post('login')
	@HttpCode(200)
	async loginUser(@Body() data: LoginUserDTO): Promise<User> {
		return await this.usersService.login(data);
	}

	@Get(':id')
	async findUserById(@Param("id") id: string): Promise<User> {
		return await this.usersService.findById(id);
	}

	@Get('')
	async findAllUsers(): Promise<User[]> {
		return await this.usersService.findAll();
	}

	@Put(':id')
	async changeDescription(@Param("id") id: string, @Body() data: ChangeDescriptionDTO): Promise<User> {
    return await this.usersService.changeDescription(id, data);
  }
}
