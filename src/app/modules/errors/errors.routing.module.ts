import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InternalErrorComponent } from './components/internal-error/internal-error.component';
import { NoReservationComponent } from './components/no-reservation/no-reservation.component';
import { NotActiveComponent } from './components/not-active/not-active.component';
import { NotAvailableComponent } from './components/not-available/not-available.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotLoggedComponent } from './components/not-logged/not-logged.component';

const routes: Routes = [
	{ path: '', component: NotFoundComponent },
	{ path: 'not-found', component: NotFoundComponent },
	{ path: 'not-logged', component: NotLoggedComponent },
	{ path: 'not-active', component: NotActiveComponent },
	{ path: 'not-available', component: NotAvailableComponent },
	{ path: 'no-reservation', component: NoReservationComponent },
	{ path: '500', component: InternalErrorComponent },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class ErrorsRoutingModule {}
