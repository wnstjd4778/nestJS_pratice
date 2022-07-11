import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from '../schema/user.schema';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { CreateUserEvent } from '../events/create-user.event';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private eventBus: EventBus,
  ) {}
  async execute(command: CreateUserCommand): Promise<void> {
    const { email, phone, name, password } = command;
    const exUser = await this.userModel.findOne({ email });
    console.log(exUser);
    if (exUser) {
      throw new BadRequestException('사용하고 있는 이메일입니다.');
    }
    const userDocument = await this.userModel.create({ email, name, phone });
    this.eventBus.publish(
      new CreateUserEvent(String(userDocument._id), password),
    );
  }
}
