import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.client';
import { CreateUserDTO } from './dto/createUser';
import { LoginUserDTO } from './dto/loginUser';
import { User } from '@prisma/client';
import { ChangeDescriptionDTO } from './dto/changeDescription';

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

		return await this.prisma.user.create({ 
			data: {
				...data,
			}
		});
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

	async changeDescription(id: string, data: ChangeDescriptionDTO): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: {
				id
			}
		})

		if (!user) throw new NotFoundException("User not found");

		return await this.prisma.user.update({
			where: {
				id
			},
			data: {
				description: data.description
			}
		})
	}
}
