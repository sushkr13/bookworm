import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOpenStageOneComponent } from './book-open-stage-one.component';

describe('BookOpenStageOneComponent', () => {
  let component: BookOpenStageOneComponent;
  let fixture: ComponentFixture<BookOpenStageOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookOpenStageOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOpenStageOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
