import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum MessageType {
  INFO,
  ERROR,
  WARN,
  DEBUG
}

export interface IMessage {
  message: string;
  type: MessageType;
}

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  private _message: Subject<IMessage> = new Subject<IMessage>();

  constructor() { }

  public get messages(): Observable<IMessage> {
    return this._message.asObservable();
  }

  public showMessage(message: string) {
    this._message.next({ message: message, type: MessageType.INFO });
  }

  public showError(message: string) {
    this._message.next({ message: message, type: MessageType.ERROR });
  }

  public showWarning(message: string) {
    this._message.next({ message: message, type: MessageType.WARN });
  }

  public showDebug(message: string) {
    this._message.next({ message: message, type: MessageType.DEBUG });
  }
  
}
