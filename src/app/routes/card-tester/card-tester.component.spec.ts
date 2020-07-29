import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTesterComponent } from './card-tester.component';

describe('CardTesterComponent', () => {
  let component: CardTesterComponent;
  let fixture: ComponentFixture<CardTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
