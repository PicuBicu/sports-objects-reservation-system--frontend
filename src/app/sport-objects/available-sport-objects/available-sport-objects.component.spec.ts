import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableSportObjectsComponent } from './available-sport-objects.component';

describe('AvailableSportObjectsComponent', () => {
  let component: AvailableSportObjectsComponent;
  let fixture: ComponentFixture<AvailableSportObjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableSportObjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableSportObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
