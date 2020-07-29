import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTesterComponent } from './table-tester.component';

describe('TableTesterComponent', () => {
  let component: TableTesterComponent;
  let fixture: ComponentFixture<TableTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
