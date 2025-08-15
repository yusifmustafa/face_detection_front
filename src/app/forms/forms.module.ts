import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
  import { FormsRoutes } from './forms.routing';

import { ExtendedFormsComponent } from './extendedforms/extendedforms.component';
import { RegularFormsComponent } from './regularforms/regularforms.component';
import { ValidationFormsComponent } from './validationforms/validationforms.component';
import { WizardComponent } from './wizard/wizard.component';
import { FieldErrorDisplayComponent } from './validationforms/field-error-display/field-error-display.component';
import {MaterialModule} from "../../material.module";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FormsRoutes),
        FormsModule,
        ReactiveFormsModule,
        NouisliderModule,
        TagInputModule,
        MaterialModule,
        MatSelectModule,
        MatCheckboxModule,
        MatButtonModule,
        MatRadioModule,
        MatDatepickerModule,
        MatTooltipModule,
    ],
  declarations: [
      ExtendedFormsComponent,
      RegularFormsComponent,
      ValidationFormsComponent,
      WizardComponent,
      FieldErrorDisplayComponent
  ]
})

export class Forms {}
