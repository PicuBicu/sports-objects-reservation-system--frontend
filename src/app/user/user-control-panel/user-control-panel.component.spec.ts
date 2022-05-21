import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserControlPanelComponent } from './user-control-panel.component';

describe('UserControlPanelComponent', () => {
  let component: UserControlPanelComponent;
  let fixture: ComponentFixture<UserControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserControlPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
