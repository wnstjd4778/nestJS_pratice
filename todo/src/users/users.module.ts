import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './schema/user.schema';
import { AuthModule } from '../auth/auth.module';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { eventsHandlers } from './events';
import { commandHandlers } from './commands';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    AuthModule,
    CqrsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, ...eventsHandlers, ...commandHandlers],
})
export class UsersModule {}
