import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotActiveComponent } from './components/not-active/not-active.component';
import { NotLoggedComponent } from './components/not-logged/not-logged.component';
import { NoReservationComponent } from './components/no-reservation/no-reservation.component';
import { ErrorsRoutingModule } from './errors.routing.module';
import { InternalErrorComponent } from './components/internal-error/internal-error.component';
import { NotAvailableComponent } from './components/not-available/not-available.component';

@NgModule({
	declarations: [ NotFoundComponent, NotActiveComponent, NotLoggedComponent, NoReservationComponent, InternalErrorComponent, NotAvailableComponent ],
	imports: [ CommonModule, ErrorsRoutingModule ]
})

export class ErrorsModule {}
