import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment';
import {
	isAnOverlapEvent,
	isBelowMaximumDuration,
	isBelowLimitPerUser,
	isFutureEvent,
	isFromSameUser,
	filterFutureEvents,
	filterPastEvents,
	filterUserEvents,
	filterCurrentEvent,
	isCurrentEvent,
	filterEditedEvents
} from './utils';
import { BookingsService } from '../../services/bookings.service';
import { NONE_TYPE } from '@angular/compiler';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!
import { Router } from '@angular/router';
import allLocales from '@fullcalendar/core/locales-all';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit {
	currentEvents: EventApi[] = [];
	calendarOptions: CalendarOptions;
	userId: string;

	@ViewChild('calendar') calendarComponent: FullCalendarComponent;

	constructor(
		protected router: Router,
		protected bookingService: BookingsService,
		protected authService: AuthenticationService
	) {
		this.calendarOptions = {
			locales: allLocales,
			locale: 'es',
			initialView: 'timeGridWeek',
			slotDuration: '00:30',
			defaultTimedEventDuration: '00:30',
			allDaySlot: false,
			eventClick: this.handleEventClick.bind(this),
			eventDurationEditable: true,
			select: this.handleDateSelect.bind(this),
			eventsSet: this.handleEvents.bind(this),
			eventChange: this.handleEventChange.bind(this),
			eventOverlap: false,
			selectable: true,
			editable: false, // In general they're not editable
			selectAllow: this.selectAllowFunction,
			eventAllow: this.changeAllowFunction,
			eventBorderColor: 'transparent',
			eventBackgroundColor: 'rgb(128 0 128 / 43%)',
			views: {
				timeGrid: {
					type: 'timeGrid',
					duration: { days: 7 }
				},
				timeGridFourDays: {
					type: 'timeGrid',
					duration: { days: 4 }
				},
				timeGridTwoDays: {
					type: 'timeGrid',
					duration: { days: 2 }
				},
				timeGridOneDay: {
					type: 'timeGrid',
					duration: { days: 1 }
				}
			}
		};
		this.userId = authService.getUserData()['userId'];

		bookingService.getBookings().subscribe(
			(result) => {
				filterFutureEvents(filterUserEvents(result, this.userId)).forEach(
					(event) => ((event.editable = true), (event.backgroundColor = 'rgb(18 255 238 / 60%)'))
				);
				filterPastEvents(result).forEach((event) => (event.backgroundColor = '#808080b5'));
				filterCurrentEvent(filterUserEvents(result, this.userId)).forEach(
					(event) => (event.backgroundColor = 'rgb(55 188 17 / 91%)')
				);
				this.calendarOptions.events = result;
			},
			(error) => console.error(error)
		);
	}
	viewMounted() {}
	ngOnInit(): void {}
	alert($something) {
		alert($something);
	}
	selectAllowFunction = (selectInfo) => {
		let conditionArray = [
			isBelowMaximumDuration(selectInfo),
			!isAnOverlapEvent(selectInfo, this.currentEvents),
			isBelowLimitPerUser(this.userId, this.currentEvents),
			isFutureEvent(selectInfo)
		];
		return !conditionArray.includes(false);
	};

	changeAllowFunction = (eventInfo) => {
		let conditionArray = [ isBelowMaximumDuration(eventInfo), isFutureEvent(eventInfo) ];
		return !conditionArray.includes(false);
	};

	handleDateSelect(selectInfo: DateSelectArg) {
		const calendarApi = selectInfo.view.calendar;
		calendarApi.addEvent({
			extendedProps: { userId: this.userId, edited: true, new: true },
			start: selectInfo.startStr,
			end: selectInfo.endStr,
			editable: true,
			startEditable: true,
			allow: this.changeAllowFunction,
			backgroundColor: 'rgb(18 255 238 / 60%)'
		});
	}
	handleEventChange(changeInfo) {
		if (!changeInfo.event.extendedProps.edited) changeInfo.event.setExtendedProp('edited', true);
	}
	handleEventClick(clickInfo: EventClickArg) {
		if (
			isFromSameUser(clickInfo.event, this.userId) &&
			(isFutureEvent(clickInfo.event) || isCurrentEvent(clickInfo.event)) &&
			confirm('¿Desea eliminar el evento seleccionado?')
		) {
			this.deleteEvent(clickInfo.event);
		}
	}
	deleteEvent(event) {
		if (event.toJSON().id) {
			this.bookingService.deleteBooking(event.toJSON().id).subscribe(
				(result) => {
					alert('Evento Borrado');
					event.remove();
				},
				(error) => {
					alert('No se pudo borrar el evento');
				}
			);
		} else {
			event.remove();
		}
	}
	handleEvents(events: EventApi[]) {
		this.currentEvents = events;
	}
	handleSubmit() {
		const events = filterEditedEvents(filterUserEvents(filterFutureEvents(this.currentEvents), this.userId));
		(Array.isArray(events) && events.length) > 0 ? this.saveEvents(events) : alert('No hay eventos seleccionados');
	}
	saveEvents(events: Array<any>) {
		const event = events.pop();
		console.log('event', event);
		event
			? event.extendedProps.new // Checks if it's new event
				? this.bookingService
						.saveBooking(event)
						.subscribe(
							(result) => this.saveEvents(events),
							(error) => {console.error(error);
							this.router.navigateByUrl('/reservas/fallo')}
						)
				: this.bookingService
						.updateBooking(event.id, event)
						.subscribe(
							(result) => this.saveEvents(events),
							(error) => {console.error(error);
                this.router.navigateByUrl('/reservas/fallo')}
						)
			: this.router.navigateByUrl('/reservas/exito');
	}

	adjustCalendar() {
		let calendarApi = this.calendarComponent.getApi();
		let width = window.innerWidth;
		width <= 360
			? calendarApi.changeView('timeGridOneDay')
			: width <= 490
				? calendarApi.changeView('timeGridTwoDays')
				: width <= 1000 ? calendarApi.changeView('timeGridFourDays') : calendarApi.changeView('timeGrid');
	}
}
