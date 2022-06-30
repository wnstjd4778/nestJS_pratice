import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from '../auth/schemas/auth.schema';
import { User, UserSchema } from './schema/user.schema';
import { JwtService } from '../jwt/jwt.service';
import { ConfigService } from '@nestjs/config';
import {
  RefreshToken,
  RefreshTokenSchema,
} from '../auth/schemas/refresh-token.schema';
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
      AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService, ConfigService],
})
export class UsersModule {}
