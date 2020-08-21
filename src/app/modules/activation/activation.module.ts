import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivationRoutingModule } from './activation.routing.module';
import { SuccessComponent } from './components/success/success.component';
import { FormComponent } from './components/form/form.component';
import { FailureComponent } from './components/failure/failure.component';
import { MainComponent } from './components/main/main.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [SuccessComponent, FormComponent, FailureComponent, MainComponent],
  imports: [
    CommonModule,
    ActivationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ActivationModule { }
