import {
  CommandBus,
  EventBus,
  EventsHandler,
  IEventHandler,
} from '@nestjs/cqrs';
import { CreateUserEvent } from './create-user.event';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from '../schema/user.schema';
import { Model } from 'mongoose';
import { CreateAuthCommand } from '../../auth/commands/create-auth.command';

@EventsHandler(CreateUserEvent)
export class CreateUserEventHandler implements IEventHandler<CreateUserEvent> {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private commandBus: CommandBus,
  ) {}
  async handle(event: CreateUserEvent): Promise<any> {
    const { userId, password } = event;
    const auth = await this.commandBus.execute(
      new CreateAuthCommand(userId, password),
    );
    await this.userModel.findByIdAndUpdate(userId, {
      $set: { auth: auth._id },
    });
  }
}
