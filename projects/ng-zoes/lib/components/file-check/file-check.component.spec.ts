import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileCheckComponent } from './file-check.component';

describe('FileCheckComponent', () => {
  let component: FileCheckComponent;
  let fixture: ComponentFixture<FileCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
