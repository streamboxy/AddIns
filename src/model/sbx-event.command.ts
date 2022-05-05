import { SBXEventCommandEnum } from "./sbx-event-command.enum";

export class SBXEventCommand {
    command: SBXEventCommandEnum;
    args: any[];

    constructor(command: SBXEventCommandEnum, ...args: any[]) {
        this.command = command;
        this.args = args;
    }
}