import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuccessComponent } from './components/success/success.component';
import { FailureComponent } from './components/failure/failure.component';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'exito', component: SuccessComponent },
    { path: 'fallo', component: FailureComponent },
    { path: ':codeId', component: MainComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivationRoutingModule { }
