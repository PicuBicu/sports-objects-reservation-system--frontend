import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationControlPanelComponent } from './reservation-control-panel.component';

describe('ReservationControlPanelComponent', () => {
  let component: ReservationControlPanelComponent;
  let fixture: ComponentFixture<ReservationControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationControlPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
