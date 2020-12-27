import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixEventsComponent } from './fix-events.component';

describe('FixEventsComponent', () => {
  let component: FixEventsComponent;
  let fixture: ComponentFixture<FixEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
