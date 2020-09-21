import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperTesterComponent } from './cropper-tester.component';

describe('CropperTesterComponent', () => {
  let component: CropperTesterComponent;
  let fixture: ComponentFixture<CropperTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropperTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropperTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
