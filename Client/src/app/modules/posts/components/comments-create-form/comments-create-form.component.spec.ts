import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsCreateFormComponent } from './comments-create-form.component';

describe('CommentsCreateFormComponent', () => {
  let component: CommentsCreateFormComponent;
  let fixture: ComponentFixture<CommentsCreateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentsCreateFormComponent]
    });
    fixture = TestBed.createComponent(CommentsCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
