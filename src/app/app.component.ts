import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order} from './order';
import {FixEvent} from './fix-events/fix-event';
import {Subject} from 'rxjs';
import {FieldValue} from './fix-fields/field-value';
import {FixManagerService} from './fix-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webui';
  messages: string[] = [];
  orderId = 0;
  columnDefs = [
    {field: 'OrderID'},
    {field: 'Symbol'},
    {field: 'Side'},
    {field: 'Price'},
    {field: 'Qty'},
    {field: 'Status'},
  ];
  rowData = [
    {OrderID: 'ORDER1', Symbol: 'IBM', Side: 'Buy', Price: 'MKT', Qty: 100, Status: 'Partially Filled'},
    {OrderID: 'ORDER2', Symbol: 'TSLA', Side: 'Buy', Price: '10.2', Qty: 50, Status: 'New'},
    {OrderID: 'ORDER3', Symbol: 'AAPL', Side: 'Sell', Price: '23.0', Qty: 25, Status: 'Rejected'}
  ];

  fixEvents: Array<FixEvent> = [];
  fixEventsSubject: Subject<void> = new Subject<void>();
  selectedMessage: Array<FieldValue> = [];
  constructor(private httpClient: HttpClient, private fixConnectionService: FixManagerService) {
    const fixEvent: FixEvent = {eventType: 'NewOrderSingle', fixMessage: '35=D\x0149=BANZAI\x0110=000'};
    this.fixEvents.push(fixEvent);

  }

  emitEventToChild() {
    this.fixEventsSubject.next();
  }
  connect() {
    this.fixConnectionService.streamEvents('BANZAI-ABCD').subscribe(x => {
      this.fixEvents.push(x);
      this.emitEventToChild();
    });
    // this.rxStompService.watch('/topic/data').subscribe((message: Message) => {
    //   console.log(message.body);
    //   this.messages.push(message.body);
    //   const fixEvent: FixEvent = {eventType: 'NewOrderSingle', fixMessage: message.body};
    //   this.fixEvents.push(fixEvent);
    //   this.emitEventToChild();
    // });
    this.httpClient.get('/api/connect').subscribe(data => {

      console.log(data); });
  }

  disconnect() {
    this.httpClient.get('/api/disconnect').subscribe(data => {
      console.log(data); } );
  }

  sendOrder() {
    const order: Order = {
      msgType: 'NewOrderSingle',
      fields: {}
    };
    const FIELD_SYMBOL = 'Symbol';
    const FIELD_CLORDID = 'ClOrdID';
    order.fields[FIELD_SYMBOL] = 'IBM';
    order.fields[FIELD_CLORDID] = 'ORDER' + this.orderId;
    this.orderId = this.orderId + 1;
    this.httpClient.post<Order>('/api/sendorder', order).subscribe(data => console.log(data));
  }

  sizeColumns(params) {
    params.api.sizeColumnsToFit();
  }

  messageSelected(param: string) {
    this.selectedMessage = this.fixConnectionService.prettifyFixMessage(param);
  }
}
