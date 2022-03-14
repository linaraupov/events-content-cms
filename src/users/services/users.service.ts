import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UsersRepository) public repo: UsersRepository) {}

  async createOne(dto: CreateUserDto) {
    try {
      const createdUser = this.repo.create(dto);

      return await this.repo.save(createdUser);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  async updateOne(dto: UpdateUserDto, userId: string) {
    try {
      return await this.repo.save({ id: userId, ...dto });
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  async getOne(id: string) {
    const user = await this.repo.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getByEmail(email: string) {
    try {
      return await this.repo.findOne({ email });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }
}
