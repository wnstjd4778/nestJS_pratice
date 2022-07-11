import {ICommand} from "@nestjs/cqrs";

export class CreateAuthCommand implements ICommand {
    constructor(public readonly userId: string, public readonly password: string) {

    }
}
