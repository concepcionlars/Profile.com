import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightsideBarComponent } from './rightside-bar.component';

describe('RightsideBarComponent', () => {
  let component: RightsideBarComponent;
  let fixture: ComponentFixture<RightsideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightsideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightsideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
