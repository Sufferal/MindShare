import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationModalComponent } from './activation-modal.component';

describe('ActivationModalComponent', () => {
  let component: ActivationModalComponent;
  let fixture: ComponentFixture<ActivationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivationModalComponent]
    });
    fixture = TestBed.createComponent(ActivationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
