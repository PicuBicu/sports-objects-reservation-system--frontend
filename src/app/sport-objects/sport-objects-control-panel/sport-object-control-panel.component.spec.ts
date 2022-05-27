import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportObjectControlPanelComponent } from './sport-object-control-panel.component';

describe('SportObjectsControlPanelComponent', () => {
  let component: SportObjectControlPanelComponent;
  let fixture: ComponentFixture<SportObjectControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportObjectControlPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportObjectControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
