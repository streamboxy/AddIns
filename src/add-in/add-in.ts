import { SBXEventCommandEnum } from "../model/sbx-event-command.enum";
import { SBXEventCommand } from "../model/sbx-event.command";
import { SBXMessageType } from "../model/sbx-message-type.enum";
import { SBXMessageEvent } from "../model/sbx-message.event";

export class AddIn {

    private _coreURL: URL;
    private _apiVersion: 'v1';

    constructor(apiVersion: 'v1', coreURL: URL) {
        this._apiVersion = apiVersion;
        this._coreURL = coreURL;

        this._registerAddIn();
    }

    /**
     * Subscribe to Messages from Streamboxy CORE
     * @param  {(data:SBXMessageEvent<T>)=>void} callback Your callback function to process received messages.
     * @returns any
     */
    public subscribeToCore<T>(callback: (data: SBXMessageEvent<T>) => void): any {
        window.addEventListener('message', (event) => this.processMessageFromCore(event, callback));
    }

    /**
     * Sends SBXEventCommand to Streamboxy CORE
     * @param  {SBXEventCommandEnum} command Command
     * @param  {any[]} ...args Arbitrary list of arguments, see event documentation
     * @returns void
     */
    public sendCommandToCore(command: SBXEventCommandEnum, ...args: any[]): void {
        this._sendMessageToCore(new SBXMessageEvent(SBXMessageType.Command, new SBXEventCommand(command, args)));
    }

    /**
     * Register an AddIn to Streamboxy CORE
     * @param {URL} coreURL URL to Streamboxy Core (Core Origin)
     * @returns void
     */
    private _registerAddIn(): void {
        this._sendNoticeToCore();
    }

    // For use with Angular v12
    // private processMessageFromCore<T>(event: MessageEvent<SBXMessageEvent<T>>, callback: (data: SBXMessageEvent<T>) => void): void {
    private processMessageFromCore<T>(event: MessageEvent, callback: (data: SBXMessageEvent<T>) => void): void {
        if (event.origin !== this._coreURL.origin) {
            return;
        }

        callback(event.data)
    }

    // Message Methods
    private _sendNoticeToCore(): void {
        this._sendMessageToCore(new SBXMessageEvent(SBXMessageType.Notice, {}));
    }

    // Send Message Window Methods
    private _sendMessageToCore(event: SBXMessageEvent): void {
        window.parent.postMessage(event, this._coreURL.origin);
    }
}
