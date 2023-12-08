import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class MessageBusService {
  private messageQueue$ = new Subject<Message | undefined>();
  onNewMessage$ = this.messageQueue$.asObservable();

  constructor() {}

  notifyForMessage(message: Message) {
    this.messageQueue$.next(message);
  }

  clear() {
    this.messageQueue$.next(undefined);
  }
}
