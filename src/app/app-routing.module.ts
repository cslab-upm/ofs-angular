import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';


const routes: Routes = [
  {path:'', component: LandingComponent},
  {path:'monitorizacion', loadChildren: () => import('./modules/monitoring/monitoring.module').then(m=>m.MonitoringModule) },
  {path:'equipamiento', loadChildren: () => import('./modules/equipment/equipment.module').then(m=>m.EquipmentModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
