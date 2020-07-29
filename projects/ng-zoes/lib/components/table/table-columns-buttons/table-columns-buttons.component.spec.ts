import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnsButtonsComponent } from './table-columns-buttons.component';

describe('TableColumnsButtonsComponent', () => {
  let component: TableColumnsButtonsComponent;
  let fixture: ComponentFixture<TableColumnsButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableColumnsButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColumnsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
