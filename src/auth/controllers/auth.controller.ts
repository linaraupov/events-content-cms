import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto';
import { SignInDto } from '../dto';
import { AuthService } from '../services';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({ description: 'Sing in' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ type: String })
  @Post('/sign-in')
  async signIn(@Body() dto: SignInDto) {
    return await this.service.signIn(dto);
  }

  @ApiOperation({ description: 'Sing up' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ type: String })
  @Post('/sign-up')
  async signUp(@Body() dto: CreateUserDto) {
    return await this.service.signUp(dto);
  }
}
