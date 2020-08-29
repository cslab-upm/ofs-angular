import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ButtonsComponent } from './components/buttons/buttons.component';

const routes: Routes = [ { path: '', component: MainComponent }, { path: 'buttons', component: ButtonsComponent } ];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class ControlsRoutingModule {}
