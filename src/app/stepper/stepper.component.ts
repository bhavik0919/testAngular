import { Component } from '@angular/core';
import { FormSection } from 'src/models/form.model';
import { FormService } from 'src/services/form.service';
import { StepperService } from 'src/services/stepper.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})

export class StepperComponent {
  sectionIndex = 0;
  formId = 0;
  formName = '';
  sections: FormSection[] = [];

  constructor(public formService: FormService,public stepService: StepperService) {
  }

  ngOnInit() {
    // Get main data from stepper service
    this.formId = this.stepService.getMainData.formId;
    this.formName = this.stepService.getMainData.formName;
    this.sections = this.stepService.getSections;

    // Generate form using form service
    this.formService.generateForm(this.formId, this.sections);

    // Subscribe to section index change event from stepper service
    this.stepService.sectionIndexChange.subscribe((value) => {
      this.sectionIndex = value;
    });
  }

  onChangeStep(i: number) {
    // Set the next step using stepper service
    this.stepService.setNextStep(i);
  }
}
