import { IEvent } from '@nestjs/cqrs';

export class CreateUserEvent implements IEvent {
  constructor(
    public readonly userId: string,
    public readonly password: string,
  ) {}


}
