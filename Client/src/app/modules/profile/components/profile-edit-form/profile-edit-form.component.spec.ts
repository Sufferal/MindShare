import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditFormComponent } from './profile-edit-form.component';

describe('ProfileEditFormComponent', () => {
  let component: ProfileEditFormComponent;
  let fixture: ComponentFixture<ProfileEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileEditFormComponent]
    });
    fixture = TestBed.createComponent(ProfileEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
