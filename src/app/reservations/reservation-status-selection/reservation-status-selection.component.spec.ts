import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationStatusSelectionComponent } from './reservation-status-selection.component';

describe('ReservationStatusSelectionComponent', () => {
  let component: ReservationStatusSelectionComponent;
  let fixture: ComponentFixture<ReservationStatusSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationStatusSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationStatusSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
