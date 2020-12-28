import {Component, Input, OnInit} from '@angular/core';
import {FieldValue} from './field-value';

@Component({
  selector: 'app-fix-fields',
  templateUrl: './fix-fields.component.html',
  styleUrls: ['./fix-fields.component.scss']
})
export class FixFieldsComponent implements OnInit {

  @Input() message: Array<FieldValue>;
  constructor() { }

  ngOnInit(): void {
  }

}
