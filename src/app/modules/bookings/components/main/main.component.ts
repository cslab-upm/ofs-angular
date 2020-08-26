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
	filterPastEvents
} from './utils';
import { BookingsService } from '../../services/bookings.service';
import { NONE_TYPE } from '@angular/compiler';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit {
	currentEvents: EventApi[] = [];
	calendarOptions: CalendarOptions;
	userId: string;
	constructor(protected bookingService: BookingsService, protected authService: AuthenticationService) {
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
			eventBorderColor: 'transparent'
		};

		bookingService.getBookings().subscribe(
			(result) => {
				console.log('receivedData', result);
				filterPastEvents(result).forEach((event) => (event.backgroundColor = 'grey'));
				filterFutureEvents(result).forEach((event) => (event.editable = true));
				this.calendarOptions.events = result;
			},
			(error) => console.error(error)
		);
		this.userId = authService.getUserData()['userId'];
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
			allow: this.changeAllowFunction
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
		const event = filterFutureEvents(this.currentEvents)[0];
		console.log('id', event.id);
		event
			? event.id
				? this.bookingService
						.updateBooking(event.id, event)
						.subscribe(
							(result) => alert('Cambios guardados correctamente'),
							(error) => alert('Fallo al guardar los cambios')
						)
				: this.bookingService.saveBooking(event).subscribe(
						(result) => {
							filterFutureEvents(this.currentEvents)[0]._def.publicId = result.id;
							alert('Evento guardado');
						},
						(error) => alert('Fallo al guardar los cambios')
					)
			: alert('No hay eventos seleccionados');
	}
}
