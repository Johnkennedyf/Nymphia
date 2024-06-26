import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.client';
import { User } from './types/user';
import { CreateUserDTO } from './dto/createUser';
import { LoginUserDTO } from './dto/loginUser';

@Injectable()
export class UsersService {
	constructor(
		private prisma: PrismaService
	){}

	async create(data: CreateUserDTO): Promise<User> {
		if (!data) throw new BadRequestException("User not found");

		const findUser = await this.prisma.user.findUnique({
			where: {
				email: data.email
			}
		})

		if (findUser) throw new ConflictException("User already exists");

		return await this.prisma.user.create({ data });
	}

	async login(data: LoginUserDTO): Promise<User> {
		const findUser = await this.prisma.user.findFirst({
			where: {
				AND: [{
					email: {
						equals: data.email
					},
					password: {
						equals: data.password
					}
				}]
			}
		})

		if (!findUser) throw new BadRequestException("User not found or password incorrect");

		return findUser;
	}

	async findById(id: string): Promise<User> {
		if (id.trim() === '') throw new BadRequestException('Id not valid');

		const user = await this.prisma.user.findUnique({ where: { id } });

		if (!user) throw new NotFoundException('User not found');

		return user;
	}

	async findAll(): Promise<User[]> {
		return await this.prisma.user.findMany();
	}
}
