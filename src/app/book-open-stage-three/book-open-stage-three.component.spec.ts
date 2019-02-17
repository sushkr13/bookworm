import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOpenStageThreeComponent } from './book-open-stage-three.component';

describe('BookOpenStageThreeComponent', () => {
  let component: BookOpenStageThreeComponent;
  let fixture: ComponentFixture<BookOpenStageThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookOpenStageThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOpenStageThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
