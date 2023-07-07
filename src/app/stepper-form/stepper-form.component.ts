import { Component, Input } from '@angular/core';
import { FormService } from 'src/services/form.service';
import { FormArray, FormGroup } from '@angular/forms';
import { StepperService } from 'src/services/stepper.service';
import { QuestionService } from 'src/services/question.service';
import { FormQuestion, FormSection } from 'src/models/form.model';

@Component({
  selector: 'app-stepper-form',
  templateUrl: './stepper-form.component.html',
  styleUrls: ['./stepper-form.component.css'],
})
export class StepperFormComponent {
  currentSection: FormSection = {
    id: 0,
    title: '',
    description: '',
    completed: false,
    questions: []
  }
  questionIndex = 0
  questions: FormQuestion[] = []

  constructor(
    public formService: FormService,
    public stepService: StepperService,
    public questionService: QuestionService
  ) {}

  // Handle keydown event for checkbox
  handleCheckboxKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      const checkbox = event.target as HTMLInputElement;
      checkbox.checked = !checkbox.checked;
    }
  }
  
  ngOnInit() {
    // Get the current section from stepper service
    this.currentSection = this.stepService.getCurrentSection;

    // Subscribe to section index change event from stepper service
    this.stepService.sectionIndexChange.subscribe((value) => {
      // Update current section and questions when section index changes
      this.currentSection = this.stepService.getCurrentSection;
      this.questions = this.stepService.getCurrentSection.questions;
      this.questionIndex = 0;
    });

    // Subscribe to question index change event from question service
    this.questionService.questionIndexChange.subscribe((value) => {
      // Update question index when it changes
      this.questionIndex = value;
    });
  }
}
