import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportObjectsDetailsComponent } from './sport-objects-details.component';

describe('SportObjectsDetailsComponent', () => {
  let component: SportObjectsDetailsComponent;
  let fixture: ComponentFixture<SportObjectsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportObjectsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportObjectsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
