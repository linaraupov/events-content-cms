import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAM } from 'src/common/decorators/iam.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateUserDto, GetUserResponseDto, UserResponseDto } from '../dto';
import { UsersService } from '../services/users.service';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiResponse({ status: 200, type: UserResponseDto })
  @ApiOperation({ description: 'Get user data' })
  @Get('/me')
  async getUser(@IAM('id') id: string) {
    const user = await this.service.getOne(id);
    return GetUserResponseDto.createOne(user);
  }

  @ApiResponse({ status: 200, type: UserResponseDto })
  @ApiOperation({ description: 'Update user data' })
  @Patch('/me')
  async patchUser(@Body() body: CreateUserDto, @IAM('id') id: string) {
    const user = await this.service.updateOne(body, id);
    return GetUserResponseDto.createOne(user);
  }
}
