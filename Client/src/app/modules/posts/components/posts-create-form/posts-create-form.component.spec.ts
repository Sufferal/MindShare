import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCreateFormComponent } from './posts-create-form.component';

describe('PostsCreateFormComponent', () => {
  let component: PostsCreateFormComponent;
  let fixture: ComponentFixture<PostsCreateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsCreateFormComponent]
    });
    fixture = TestBed.createComponent(PostsCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
