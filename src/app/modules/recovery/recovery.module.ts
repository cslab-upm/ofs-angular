import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from './components/success/success.component';
import { FailureComponent } from './components/failure/failure.component';
import { FormComponent } from './components/form/form.component';
import { MainComponent } from './components/main/main.component';
import { PasswordFormComponent } from './components/passwordform/passwordform.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecoveryRoutingModule } from './recovery.routing.module';

@NgModule({
	declarations: [ SuccessComponent, FailureComponent, FormComponent, MainComponent, PasswordFormComponent ],
	imports: [ CommonModule, RecoveryRoutingModule, FormsModule, ReactiveFormsModule ]
})
export class RecoveryModule {}
