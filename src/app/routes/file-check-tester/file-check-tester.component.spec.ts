import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileCheckTesterComponent } from './file-check-tester.component';

describe('FileCheckTesterComponent', () => {
  let component: FileCheckTesterComponent;
  let fixture: ComponentFixture<FileCheckTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileCheckTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileCheckTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
