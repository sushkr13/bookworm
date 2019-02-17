import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOpenStageTwoComponent } from './book-open-stage-two.component';

describe('BookOpenStageTwoComponent', () => {
  let component: BookOpenStageTwoComponent;
  let fixture: ComponentFixture<BookOpenStageTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookOpenStageTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOpenStageTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
