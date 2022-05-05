import { SBXMessageType } from "./sbx-message-type.enum";

/**
 * A SBXMessageEvent contains a message type and provides specific payload.
 */
export class SBXMessageEvent<T = any> {
    type: SBXMessageType;
    data: T;

    constructor(type: SBXMessageType, data: T) {
        this.type = type;
        this.data = data;
    }
}
