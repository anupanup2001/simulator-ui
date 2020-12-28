import {Component, Input, OnChanges, OnInit, SimpleChanges, EventEmitter, Output} from '@angular/core';
import {FixEvent} from './fix-event';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-fix-events',
  templateUrl: './fix-events.component.html',
  styleUrls: ['./fix-events.component.scss']
})
export class FixEventsComponent implements OnInit, OnChanges {

  columnDefs = [
    {field: 'Event', suppressSizeToFit: true},
    {field: 'Message'}
  ];

  private gridApi;
  private eventsSubscription: Subscription;
  @Input() rowData: Array<FixEvent>;
  @Input() rowUpdated: Observable<void>;
  @Output() messageSelected = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    // let evnt: FixEvent = {Event: 'NewOrderSingle', Message: '35=D|38=10'};
    // this.rowData.push(evnt);
    this.eventsSubscription = this.rowUpdated.subscribe(() => {
      this.gridApi.setRowData(this.rowData);
      console.log('Got event in child');
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  sizeColumns(params) {
    params.api.sizeColumnsToFit();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  rowSelected(params) {
    this.messageSelected.emit(params.data.Message);
  }

}
