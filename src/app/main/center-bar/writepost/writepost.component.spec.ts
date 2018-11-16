import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritepostComponent } from './writepost.component';

describe('WritepostComponent', () => {
  let component: WritepostComponent;
  let fixture: ComponentFixture<WritepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
