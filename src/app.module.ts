import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { envMap } from './common/configurations';
import { JWTConfigService, TypeOrmConfigService } from './common/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envMap],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    JwtModule.registerAsync({
      useClass: JWTConfigService,
    }),
    PassportModule,
    UsersModule,
    AuthModule,
    EventsModule,
  ],
})
export class AppModule {}
