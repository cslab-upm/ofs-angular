import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';


const routes: Routes = [
  {path:'', component: LandingComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'account', component: AccountComponent},
  {path:'monitorizacion', loadChildren: () => import('./modules/monitoring/monitoring.module').then(m=>m.MonitoringModule) },
  {path:'equipamiento', loadChildren: () => import('./modules/equipment/equipment.module').then(m=>m.EquipmentModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
