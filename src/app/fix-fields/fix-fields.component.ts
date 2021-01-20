import {Component, Input, OnInit} from '@angular/core';
import {FieldValue} from './field-value';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-fix-fields',
  templateUrl: './fix-fields.component.html',
  styleUrls: ['./fix-fields.component.scss']
})
export class FixFieldsComponent implements OnInit {

  @Input() message: FieldValue[];
  bogusDataSource = new MatTableDataSource<FieldValue>(null);
  displayedColumns: string[] = ['field', 'value'];
  constructor() { }

  ngOnInit(): void {
  }

}
