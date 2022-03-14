import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IAM } from 'src/common/decorators/iam.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PatchUserGuard } from './patch-user.guard';
import { CreateOrUpdateUserDto, GetUserResponseDto } from './users.dto';
import { UsersService } from './users.service';
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: GetUserResponseDto })
  @Get('/me')
  async getUser(@IAM('id') id: string) {
    const user = await this.service.getOne(id);
    return GetUserResponseDto.createOne(user);
  }

  @UseGuards(JwtAuthGuard, PatchUserGuard)
  @ApiResponse({ status: 200, type: GetUserResponseDto })
  @Patch('/me')
  async patchUser(@Body() body: CreateOrUpdateUserDto, @IAM('id') id: string) {
    const user = await this.service.createOrUpdate(body, id);
    return GetUserResponseDto.createOne(user);
  }
}
