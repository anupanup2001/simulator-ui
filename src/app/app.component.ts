import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {Order} from './order';
import {FixEvent} from './fix-events/fix-event';
import {Subject} from 'rxjs';

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
  constructor(private httpClient: HttpClient, private rxStompService: RxStompService) {
    const fixEvent: FixEvent = {Event: 'NewOrderSingle', Message: 'ABCD'};
    this.fixEvents.push(fixEvent);

  }

  emitEventToChild() {
    this.fixEventsSubject.next();
  }
  connect() {
    this.rxStompService.watch('/topic/data').subscribe((message: Message) => {
      console.log(message.body);
      this.messages.push(message.body);
      const fixEvent: FixEvent = {Event: 'NewOrderSingle', Message: message.body};
      this.fixEvents.push(fixEvent);
      this.emitEventToChild();
    });
    this.httpClient.get('/api/connect').subscribe(data => {
      // this.rxStompService.watch('/topic/data').subscribe((message: Message) => {
      //   console.log(message.body);
      //   this.messages.push(message.body);
      // });
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
}
