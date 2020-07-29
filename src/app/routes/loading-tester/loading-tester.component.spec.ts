import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingTesterComponent } from './loading-tester.component';

describe('LoadingTesterComponent', () => {
  let component: LoadingTesterComponent;
  let fixture: ComponentFixture<LoadingTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
