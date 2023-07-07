import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormQuestion, FormSection } from 'src/models/form.model';
import { StepperService } from './stepper.service';
import { QuestionService } from './question.service';

@Injectable()
export class FormService {
  public currentSection!: 0;
  public currentQuestion!: 0;
  public formId!: 0;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public stepService: StepperService,
    public questionService: QuestionService
  ) {
    this.createForm();
  }

  private createForm() {
    // Create the form using FormBuilder
    this.form = this.formBuilder.group({
      formId: [null],
      sections: this.formBuilder.array([]),
    });
  }

  get currentSectionFormGroup(): FormGroup {
    // Get the current section form group based on the section index from the stepper service
    return (this.form.get('sections') as FormArray).controls.at(
      this.stepService.sectionIndex
    ) as FormGroup;
  }

  get currentQuestionFormGroup(): FormGroup {
    // Get the current question form group based on the question index from the question service
    return (this.currentSectionFormGroup.get('questions') as FormArray).controls.at(
      this.questionService.questionIndex
    ) as FormGroup;
  }

  get optionsFormArray() {
    // Get the options form array of the current question
    return (this.currentQuestionFormGroup.get('options') as FormArray).controls;
  }

  questionsFormArray(section: FormSection): FormArray {
    // Create a form array for the questions in a section
    const questionsArray = this.formBuilder.array([]) as FormArray;
    section.questions.forEach((question) => {
      const questionGroup = this.formBuilder.group({
        questionId: question.id,
        options: this.optionFormArray(question),
      });
      questionsArray.push(questionGroup);
    });
    return questionsArray;
  }

  optionFormArray(question: FormQuestion): FormArray {
    // Create a form array for the options in a question
    const optionsArray = this.formBuilder.array([]) as FormArray;
    question.options.forEach((option) => {
      const optionGroup = this.formBuilder.group({
        id: option.id,
        value: option.value,
        selected: false,
      });
      optionsArray.push(optionGroup);
    });
    return optionsArray;
  }

  generateForm(formId: number, sections: FormSection[]) {
    // Generate the dynamic form based on formId and sections data
    this.form.patchValue({ formId: formId });
    const sectionsArray = this.form.get('sections') as FormArray;
    sections.forEach((section) => {
      const sectionGroup = this.formBuilder.group({
        sectionId: section.id,
        questions: this.questionsFormArray(section),
      });
      sectionsArray.push(sectionGroup);
    });
  }

  submitForm() {
    // Submit the form if it is valid
    if (this.form.valid) {
      console.log('Form submitted successfully', this.form.valid);
      console.log('Form values:', this.form.value);

      // You can also reset the form after submission if needed
      // this.form.reset();
      // window.location.reload()
    } else {
      // Mark all fields as touched to display validation errors
      this.form.markAllAsTouched();
    }
  }

  deleteAnswer() {
    console.log('Form submission deleted successfully');
    console.log('Form values:', this.form.value);

    // You can also reset the form after submission if needed
    // this.form.reset();

    console.log('Form values cleared:', this.form.value);
  }

  saveDraft() {
    console.log('Form data captured successfully');
    console.log('Form values:', this.form.value);
  }
}