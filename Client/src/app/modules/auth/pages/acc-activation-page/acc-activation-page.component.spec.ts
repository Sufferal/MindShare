import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccActivationPageComponent } from './acc-activation-page.component';

describe('AccActivationPageComponent', () => {
  let component: AccActivationPageComponent;
  let fixture: ComponentFixture<AccActivationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccActivationPageComponent]
    });
    fixture = TestBed.createComponent(AccActivationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
