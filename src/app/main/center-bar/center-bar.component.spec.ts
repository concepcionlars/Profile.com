import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterBarComponent } from './center-bar.component';

describe('CenterBarComponent', () => {
  let component: CenterBarComponent;
  let fixture: ComponentFixture<CenterBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
