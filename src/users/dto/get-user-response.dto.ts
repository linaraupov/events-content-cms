import { User } from '../entities/user.entity';
import { UserResponseDto } from './user-response.dto';

export class GetUserResponseDto extends UserResponseDto {
  constructor(data: GetUserResponseDto) {
    super();
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
  }

  static createOne(user: User) {
    return new GetUserResponseDto({
      ...user,
    });
  }
}
