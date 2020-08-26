import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
	{ path: '', component: LandingComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{
		path: 'monitorizacion',
		loadChildren: () => import('./modules/monitoring/monitoring.module').then((m) => m.MonitoringModule)
	},
	{
		path: 'equipamiento',
		loadChildren: () => import('./modules/equipment/equipment.module').then((m) => m.EquipmentModule)
	},
	{
		path: 'activar',
		loadChildren: () => import('./modules/activation/activation.module').then((m) => m.ActivationModule)
	},
	{
		path: 'recuperar',
		loadChildren: () => import('./modules/recovery/recovery.module').then((m) => m.RecoveryModule)
	},
	{
		path: 'perfil',
		loadChildren: () => import('./modules/profile/profile.module').then((m) => m.ProfileModule)
	},
	{
		path: 'reservas',
		loadChildren: () => import('./modules/bookings/bookings.module').then((m) => m.BookingsModule)
	},
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
