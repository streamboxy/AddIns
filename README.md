# Add-Ins 

## General informations and data model
You will find the general informations to the STREAMBOXY AddIn Model and the data model of the events at the STREAMBOXY Docs here:
https://service.streamboxy.com/support/solutions/articles/50000087752-interaction-using-addin-events-commands


## How to use AddIn Events & Commands?


### Sample Implementation
You will find sample implementations in addition to the concepts described in this article in our Github Repo:
https://github.com/streamboxy


I.e. Navigation to different Sessions within an event: https://github.com/streamboxy/code-samples/blob/main/control/navigate/navigate.html



### Preparation of Cross-Domain Communication
Integrating into STREAMBOXY Core utilizes Cross-Domain Communication. To do this in a secure manner both STREAMBOXY Core and your AddIn need to know each other's domains. STREAMBOXY Core attaches an URL Search Parameter to every Content URL to provide a content page with its currently loaded STREAMBOXY Core origin. To access this information, our Add-In packages provides a helper class. If you use Vanilla JS, you can access the param by yourself. Please use the provided code snippets to get started.



#### Using @streamboxy/add-ins
```
var origin = AddInHelper.parseOriginURLFromSearchParam('origin'));
```


### Register an AddIn
Before you can subscribe to new STREAMBOXY Core UI Events, you have to tell STREAMBOXY Core that your application wants to receive data. This is necessary because interaction between Core and an AddIn is conducted in a secure environment. 



In order to accomplish that, simply call the registerAddIn Method (make sure your call includes your used apiVersion - currently only "v1" is supported) or send a "Notice Event" by yourself.



#### Using @streamboxy/add-ins

```
// Example using Angular, you can use any JavaScript or, more preferably, any TypeScript Framework

private addIn?: AddIn;

constructor() { }

ngAfterViewInit(): void {
 this.addIn = new AddIn("v1", AddInHelper.parseOriginURLFromSearchParam('origin')); 
}

```


### Subscribe to STREAMBOXY Core AddIn Events
In order receive events from STREAMBOXY Core, you have to subscribe to these events.



The following Code Samples show you how to subscribe to Events in your AddIn.



#### STREAMBOXY AddIn Message Types
A STREAMBOXY Core Event (which is sent to your AddIn as well) always contains a message type to state which data was sent. After your Notice STREAMBOXY Core sends the current configuration (SessionStyle, Language, UserContext, SessionData) to your subscribed handlers. If a property is updated STREAMBOXY Core provides an update as well. The command type is used by your AddIn to send a command to the Core application. The following list (to be extended in the future) shows currently supported message types. You can find the identifier for VanillaJS integrations in brackets.

* Notice (0)
* SessionStyle (1)
* Language (2)
* UserContext (3)
* SessionData (4)
* Command (5)
* TenantContext (6) - only in the backstage
* BackstageStyle (7) - only in the backstage




#### Angular using @streamboxy/add-ins
```
// Example using Angular, you can use any JavaScript or, more preferably, any TypeScript Framework

constructor() { }

ngAfterViewInit(): void {
  this.addIn = new AddIn("v1", AddInHelper.parseOriginURLFromSearchParam('origin'));

    this.addIn.subscribeToCore(this.processMessage.bind(this));
}

private processMessage(event: SBXMessageEvent): void {
    switch (event.type) {
      case SBXMessageType.Notice: {
        break;
      }
      case SBXMessageType.SessionStyle: {
       // Apply new Styling
       // Access SessionStyle Object using event.data
       this._styleService.update(event.data);
        break;
      }
      case SBXMessageType.Language: {
       // Apply new Language
       // Access Language string using event.data
        const langTag = event?.data?.split('-')[0] ?? event?.data;
        this._languageService.switchLanguage(langTag);

        break;
      }
      case SBXMessageType.UserContext: {
       // Apply new UserContext
       // Access UserContext Object using event.data
        this._acs.changeRole(event?.data?.role);

        break;
      }
      case SBXMessageType.SessionData: {
       // Apply new SessionData
       // Access SessionData Object using event.data

        this.updateConfig(event.data);
        break;
      }
      default: {
        break;
      }
    }
  }
```



### Send Commands to STREAMBOXY Core
You can control STREAMBOXY Core UI by sending commands to it. 



For example, you can change the users session by sending a "NavigateToSession"-Command, which is show in the code below.

The target session Ids used in this sample can also be retrieved using the STREAMBOXY API.



#### STREAMBOXY Command Types
STREAMBOXY Core listens to specific commands sent by your AddIn to control the Core application. The following commands are available (list to be extended in the future), you can find the required arguments in brackets.

* NavigateToSession (sessionId)
* ReadyState


#### Angular using @streamboxy/add-ins
```
// Example using Angular, you can use any JavaScript or, more preferably, any TypeScript Framework

constructor() { }

navigate(): void {
  const targetSessionId = "<SBXSessionId>";

this.addIn.sendCommandToCore(SBXEventCommandEnum.NavigateToSession, targetSessionId);
}
```