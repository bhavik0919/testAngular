import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StepperService } from './stepper.service';

@Injectable()
export class QuestionService {
  questionIndex: number = 0;
  questions: any[] = [];

  questionIndexChange: Subject<number> = new Subject<number>();

  constructor(public stepService: StepperService) {
    // Initialize the question index and get the questions from the current section
    this.questions = this.stepService.getCurrentSection.questions;

    // Subscribe to section index changes to update the questions and reset the question index
    this.stepService.sectionIndexChange.subscribe((value) => {
      this.questions = this.stepService.getCurrentSection.questions;
      this.questionIndex = 0;
    });

    // Subscribe to question index changes to update the current question index
    this.questionIndexChange.subscribe((value) => {
      this.questionIndex = value;
    });
  }

  nextQuestion() {
    // Move to the next question if available
    if (this.questionIndex < this.questions.length - 1) {
      this.questionIndex++;
      this.questionIndexChange.next(this.questionIndex);
    }
  }

  previousQuestion() {
    // Move to the previous question if available
    if (this.questionIndex > 0) {
      this.questionIndex--;
      this.questionIndexChange.next(this.questionIndex);
    }
  }
}