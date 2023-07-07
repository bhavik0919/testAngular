import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StepperComponent } from './stepper/stepper.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { StepperFormComponent } from './stepper-form/stepper-form.component';
import { FormService } from 'src/services/form.service';
import { MatRadioModule } from '@angular/material/radio';
import { StepperService } from 'src/services/stepper.service';
import { QuestionService } from 'src/services/question.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StepperComponent,
    StepperFormComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatCheckboxModule,
  ],
  providers: [FormService, StepperService,QuestionService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {}
