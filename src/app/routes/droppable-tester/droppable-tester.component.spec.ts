import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DroppableTesterComponent } from './droppable-tester.component';

describe('DroppableTesterComponent', () => {
  let component: DroppableTesterComponent;
  let fixture: ComponentFixture<DroppableTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DroppableTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DroppableTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
