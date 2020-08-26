import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { SuccessComponent } from './components/success/success.component';
import { FailureComponent } from './components/failure/failure.component';
import { BookingsRoutingModule } from './bookings.routing.module';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import timeGridPlugin  from '@fullcalendar/timegrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

FullCalendarModule.registerPlugins([
	// register FullCalendar plugins
	timeGridPlugin,
	interactionPlugin
]);

@NgModule({
	declarations: [ MainComponent, SuccessComponent, FailureComponent ],
	imports: [ CommonModule, BookingsRoutingModule, FullCalendarModule ]
})
export class BookingsModule {}
