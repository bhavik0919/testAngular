import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperFormComponent } from './stepper-form.component';
import { FormService } from 'src/services/form.service';
import { StepperService } from 'src/services/stepper.service';
import { QuestionService } from 'src/services/question.service';

describe('StepperFormComponent', () => {
  let component: StepperFormComponent;
  let fixture: ComponentFixture<StepperFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepperFormComponent],
      providers: [FormService, StepperService,QuestionService],
    });
    fixture = TestBed.createComponent(StepperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
