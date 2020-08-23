import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { SuccessComponent } from './components/success/success.component';
import { FailureComponent } from './components/failure/failure.component';



@NgModule({
  declarations: [MainComponent, SuccessComponent, FailureComponent],
  imports: [
    CommonModule
  ]
})
export class BookingsModule { }
