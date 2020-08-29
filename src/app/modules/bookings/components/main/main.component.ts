import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import * as moment from 'moment';
import {
	isAnOverlapEvent,
	isBelowMaximumDuration,
	isBelowLimitPerUser,
	isFutureEvent,
	isFromSameUser,
	filterFutureEvents,
	filterPastEvents,
	filterUserEvents
} from './utils';
import { BookingsService } from '../../services/bookings.service';
import { NONE_TYPE } from '@angular/compiler';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!
import { Router } from '@angular/router';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit {
	currentEvents: EventApi[] = [];
	calendarOptions: CalendarOptions;
	userId: string;
	constructor(
		protected router: Router,
		protected bookingService: BookingsService,
		protected authService: AuthenticationService
	) {
		this.calendarOptions = {
			initialView: 'timeGridWeek',
			slotDuration: '00:30',
			defaultTimedEventDuration: '00:30',
			allDaySlot: false,
			eventClick: this.handleEventClick.bind(this),
			eventDurationEditable: true,
			select: this.handleDateSelect.bind(this),
			eventsSet: this.handleEvents.bind(this),
			eventOverlap: false,
			selectable: true,
			editable: false,
			selectAllow: this.selectAllowFunction,
			eventAllow: this.changeAllowFunction,
			eventBorderColor: 'transparent',
			eventBackgroundColor: 'rgb(128 0 128 / 43%)'
		};
		this.userId = authService.getUserData()['userId'];

		bookingService.getBookings().subscribe(
			(result) => {
				console.log('receivedData', result);
				filterFutureEvents(filterUserEvents(result, this.userId)).forEach(
					(event) => ((event.editable = true), (event.backgroundColor = 'rgb(55 188 17 / 91%)'))
				);
				filterPastEvents(result).forEach((event) => (event.backgroundColor = '#808080b5'));
				this.calendarOptions.events = result;
			},
			(error) => console.error(error)
		);
	}

	ngOnInit(): void {
		console.log(this.calendarOptions.initialEvents);
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
			extendedProps: { userId: this.userId },
			start: selectInfo.startStr,
			end: selectInfo.endStr,
			editable: true,
			startEditable: true,
			allow: this.changeAllowFunction,
			backgroundColor: 'rgb(55 188 17 / 91%)'
		});
	}
	handleEventClick(clickInfo: EventClickArg) {
		if (
			isFromSameUser(clickInfo.event, this.userId) &&
			isFutureEvent(clickInfo.event) &&
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
	createEventId() {
		return Math.floor(Math.random() * 100000).toString();
	}
	handleEvents(events: EventApi[]) {
		this.currentEvents = events;
	}
	handleSubmit() {
		const event = filterUserEvents(filterFutureEvents(this.currentEvents), this.userId)[0];
		console.log('id', event.id);
		event
			? event.id
				? this.bookingService
						.updateBooking(event.id, event)
						.subscribe(
							(result) => this.router.navigateByUrl('/reservas/exito'),
							(error) => this.router.navigateByUrl('/reservas/fracaso')
						)
				: this.bookingService
						.saveBooking(event)
						.subscribe(
							(result) => this.router.navigateByUrl('/reservas/exito'),
							(error) => this.router.navigateByUrl('/reservas/fracaso')
						)
			: alert('No hay eventos seleccionados');
	}
}
