import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { ProfileRoutingModule } from './profile.routing.module';
import { FirstNameFormComponent } from './components/firstNameForm/firstNameForm.component';
import { LastNameFormComponent } from './components/lastNameForm/lastNameForm.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [MainComponent, FirstNameFormComponent, LastNameFormComponent, PasswordFormComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProfileModule { }
