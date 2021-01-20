import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixFieldsComponent } from './fix-fields.component';

describe('FixFieldsComponent', () => {
  let component: FixFieldsComponent;
  let fixture: ComponentFixture<FixFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
