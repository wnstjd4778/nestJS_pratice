import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAuthCommand } from './create-auth.command';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, AuthModel } from '../schemas/auth.schema';
import { Model } from 'mongoose';

@CommandHandler(CreateAuthCommand)
export class CreateAuthCommandHandler
  implements ICommandHandler<CreateAuthCommand>
{
  constructor(
    @InjectModel(AuthModel.name) private authModel: Model<AuthDocument>,
  ) {}

  async execute(command: CreateAuthCommand): Promise<AuthDocument> {
    const { userId, password } = command;
    return await this.authModel.create({
      user: userId,
      providerId: userId,
      password,
    });
  }
}
