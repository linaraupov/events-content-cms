import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrUpdateUserDto } from './users.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UsersRepository) public repo: UsersRepository) {}

  async createOrUpdate(dto: CreateOrUpdateUserDto, userId?: string) {
    try {
      const user = this.repo.create(dto);

      return await this.repo.save(userId ? { id: userId, ...user } : user);
    } catch (e) {
      throw new UnprocessableEntityException(e?.message);
    }
  }

  async getOne(id: string) {
    try {
      return await this.repo.findOne(id);
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  async getByEmail(email: string) {
    try {
      return await this.repo.findOne({ email });
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }
}
