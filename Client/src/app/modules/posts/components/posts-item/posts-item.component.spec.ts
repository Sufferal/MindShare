import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsItemComponent } from './posts-item.component';

describe('PostsItemComponent', () => {
  let component: PostsItemComponent;
  let fixture: ComponentFixture<PostsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsItemComponent]
    });
    fixture = TestBed.createComponent(PostsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
