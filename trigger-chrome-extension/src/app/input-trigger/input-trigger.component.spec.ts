import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTriggerComponent } from './input-trigger.component';

describe('InputTriggerComponent', () => {
  let component: InputTriggerComponent;
  let fixture: ComponentFixture<InputTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTriggerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
