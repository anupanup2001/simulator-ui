import { Injectable } from '@angular/core';
import {Observable, Subscriber} from 'rxjs';
import {FixEvent} from './fix-events/fix-event';
import {Message} from '@stomp/stompjs';
import {RxStompService} from '@stomp/ng2-stompjs';
import {FieldValue} from './fix-fields/field-value';
import {FixFieldNumbers} from './fix-field-numbers.enum';
import {FixMsgType} from './fix-msg-type.enum';

@Injectable({
  providedIn: 'root'
})
export class FixManagerService {
  eventSubscribers = new Map<string, Subscriber<FixEvent>>();
  constructor(private rxStompService: RxStompService) { }
  streamEvents(sessionID: string) {
    const foo = new Observable<FixEvent>( subscriber => {
      this.eventSubscribers.set(sessionID, subscriber);
    });
    this.rxStompService.watch('/topic/data').subscribe((message: Message) => {
      console.log(message.body);
      const fixEvent: FixEvent = {eventType: this.getMessageTypeFromRawFix(message.body), fixMessage: message.body};
      this.eventSubscribers.get(sessionID).next(fixEvent);
    });
    return foo;
  }

  prettifyFixMessage(fixMessage: string) {
    const fieldValues: FieldValue[] = [];
    for (const i of fixMessage.split('\x01')) {
      if (i) {
        const fieldNumber = i.split('=')[0];
        const fieldName = FixFieldNumbers[fieldNumber] + ' (' + fieldNumber + ')';
        const fv: FieldValue = {field: fieldName, value: i.split('=')[1]};
        fieldValues.push(fv);
      }
    }
    return fieldValues;
  }


  getMessageTypeFromRawFix(fixMessage: string) {
    let msgType = '-1';
    let msgTypeString = 'Unknown';
    for (const i of fixMessage.split('\x01')) {
      if (i.split('=')[0] === '35') {
        msgType = i.split('=')[1];
        break;
      }
    }
    const keys = Object.keys(FixMsgType).filter(x => FixMsgType[x] === msgType);
    if (keys.length > 0) {
      msgTypeString = keys[0];
    }
    return msgTypeString;
  }
}
