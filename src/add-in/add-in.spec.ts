import { AddIn } from './add-in';
import { SBXMessageType } from '../model/sbx-message-type.enum';
import { SBXMessageEvent } from '../model/sbx-message.event';
import { SBXEventCommand, SBXEventCommandEnum } from '..';

describe('AddIn', () => {
  beforeEach(() => {
    window.parent.postMessage = jest.fn();
    window.addEventListener = jest.fn();
  });

  it('should be constructed', () => {
    const sbxCoreUrl = new URL('https://stage.streamboxy.com');
    const addIn = new AddIn('v1', sbxCoreUrl);

    expect(addIn).toBeDefined();
  });

  it('should be send notice message to parent frame', () => {
    const sbxCoreUrl = new URL('https://stage.streamboxy.com');
    const addIn = new AddIn('v1', sbxCoreUrl);

    expect(addIn).toBeDefined();
    expect(window.parent.postMessage).toHaveBeenCalledTimes(1);
    expect(window.parent.postMessage).toHaveBeenCalledWith(new SBXMessageEvent(SBXMessageType.Notice, {}), sbxCoreUrl.origin)
  });

  it('should be send command to parent frame', () => {
    const sbxCoreUrl = new URL('https://stage.streamboxy.com');
    const addIn = new AddIn('v1', sbxCoreUrl);

    addIn.sendCommandToCore(SBXEventCommandEnum.NavigateToSession, "abc");
    expect(window.parent.postMessage).toHaveBeenCalledTimes(2);
    expect(window.parent.postMessage).toHaveBeenCalledWith(
      new SBXMessageEvent(
        SBXMessageType.Command,
        new SBXEventCommand(SBXEventCommandEnum.NavigateToSession, ["abc"])
      ), sbxCoreUrl.origin
    );
  });

  it('should subscribe to core', () => {
    const sbxCoreUrl = new URL('https://stage.streamboxy.com');
    const addIn = new AddIn('v1', sbxCoreUrl);

    addIn.subscribeToCore(() => {
      console.log('test');
    });

    expect(window.addEventListener).toHaveBeenCalled();
  });
});