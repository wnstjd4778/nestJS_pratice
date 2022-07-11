import { ICommand } from '@nestjs/cqrs';
import { User } from '../../types/user';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly phone: string,
    public readonly password: string,
  ) {}

}
