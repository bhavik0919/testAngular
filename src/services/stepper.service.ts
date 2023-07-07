import { Injectable } from '@angular/core';
import { FormSection } from 'src/models/form.model';
import formData from '../assets/questions.json';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class StepperService {
  sectionIndex = 0;

  sectionIndexChange: Subject<number> = new Subject<number>();

  constructor() {
    // Subscribe to section index changes to update the current section index
    this.sectionIndexChange.subscribe((value) => {
      this.sectionIndex = value;
    });
  }

  get getMainData() {
    // Get the main form data from the imported JSON file
    return formData;
  }

  get getSections(): FormSection[] {
    // Get all sections from the main form data
    return this.getMainData.sections;
  }

  get getCurrentSection(): FormSection {
    // Get the current section based on the current section index
    return this.getMainData.sections[this.sectionIndex];
  }

  setNextStep(value: number) {
    // Set the next step/section index
    console.log("click on step", value + 1);
    this.sectionIndexChange.next(value);
  }
}