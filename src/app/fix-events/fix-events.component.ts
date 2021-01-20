import {Component, Input, OnChanges, OnInit, SimpleChanges, EventEmitter, Output, ViewChild} from '@angular/core';
import {FixEvent} from './fix-event';
import {Observable, Subscription} from 'rxjs';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

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
  @Input() fixEvents: FixEvent[];
  @Input() rowUpdated: Observable<void>;
  @Output() messageSelected = new EventEmitter<string>();
  displayedColumns: string[] = ['eventType', 'fixMessage'];
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource: MatTableDataSource<FixEvent>;
  selection = new SelectionModel<FixEvent>(false, []);
  constructor() { }

  ngOnInit(): void {
    // let evnt: FixEvent = {Event: 'NewOrderSingle', Message: '35=D|38=10'};
    // this.rowData.push(evnt);
    this.eventsSubscription = this.rowUpdated.subscribe(() => {
      // this.gridApi.setRowData(this.fixEvents);
      this.table.renderRows();
      console.log('Got event in child');
      console.log(this.fixEvents);
    });

    this.dataSource = new MatTableDataSource<FixEvent>(this.fixEvents);
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

  rowSelected(params: FixEvent) {
    this.messageSelected.emit(params.fixMessage);
  }

}
