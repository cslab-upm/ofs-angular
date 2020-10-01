import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { BookingsService } from 'src/app/modules/bookings/services/bookings.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit, OnDestroy {
	@ViewChild('imageControl') imageControl: ElementRef;
	centralX: number;
	centralY: number;
	positionY: number;
	positionX: number;
	key: string;
	fullScreen: boolean;
	endTime: moment.Moment;
	timer: any;
	selectedObject: string;
	constructor(protected bookingService: BookingsService, protected router: Router) {
		this.centralX = 11;
		this.centralY = 9;
		this.positionX = this.centralX;
		this.positionY = this.centralY;
		this.selectedObject = 'Select an Object';

		bookingService.getCurrentBooking().subscribe(
			(result) => {
				this.endTime = moment(result['end']);
				console.log('endTime', this.endTime);
			},
			(error) => console.log(error)
		);
	}

	ngOnInit(): void {
		this.clearTimer();
		this.setTimer();
	}
	ngOnDestroy(): void {
		this.clearTimer();
	}

	setTimer() {
		this.timer = setTimeout(() => {
			alert('Tiempo de reserva finalizado');
			this.router.navigateByUrl('/reservas');
		}, this.endTime.diff(moment()));
	}
	clearTimer() {
		this.timer ? clearTimeout(this.timer) : '';
	}
	toggleFullscreen() {
		this.fullScreen = !this.fullScreen;
	}
	exitFullscreen() {
		this.fullScreen = false;
	}
	@HostListener('document:keydown', [ '$event' ])
	handleKeyboardEvent(event: KeyboardEvent) {
		if (event.key === 'w' || event.key === 'ArrowUp') {
			event.preventDefault();
			this.moveUp();
		}
		if (event.key === 'a' || event.key === 'ArrowLeft') {
			event.preventDefault();
			this.moveLeft();
		}
		if (event.key === 's' || event.key === 'ArrowDown') {
			event.preventDefault();
			this.moveDown();
		}
		if (event.key === 'd' || event.key === 'ArrowRight') {
			event.preventDefault();
			this.moveRight();
		}
		if (event.key === ' ') {
			event.preventDefault();
			this.moveCenter();
		}
		if (event.key === 'Enter') {
			this.saveCoordinates();
		}
		if (event.key === 'Escape') {
			this.exitFullscreen();
		}
	}
	moveUp() {
		this.positionY -= 1;
		this.imageControl.nativeElement.style.backgroundPositionY = this.positionY + '%';
	}
	moveDown() {
		this.positionY += 1;
		this.imageControl.nativeElement.style.backgroundPositionY = this.positionY + '%';
	}

	moveRight() {
		this.positionX += 1;
		this.imageControl.nativeElement.style.backgroundPositionX = this.positionX + '%';
	}
	moveLeft() {
		this.positionX -= 1;
		this.imageControl.nativeElement.style.backgroundPositionX = this.positionX + '%';
	}
	moveCenter() {
		this.positionX = this.centralX;
		this.positionY = this.centralY;
		this.imageControl.nativeElement.style.backgroundPositionX = this.positionX + '%';
		this.imageControl.nativeElement.style.backgroundPositionY = this.positionY + '%';
	}

	followObject = ($value) => {
		this.selectedObject = $value;
		if ($value === 'moon') {
			this.centralX = 84;
			this.centralY = 9;
		}
		if ($value === 'sun') {
			this.centralX = 11;
			this.centralY = 9;
		}
		if ($value === 'mars') {
			this.centralX = 15;
			this.centralY = 50;
		}
		if ($value === 'jupiter') {
			this.centralX = 82;
			this.centralY = 51;
		}
		if ($value === 'saturn') {
			this.centralX = 84;
			this.centralY = 89;
		}
		if ($value === 'venus') {
			this.centralX = 15;
			this.centralY = 88;
		}
		this.moveCenter();
	};
	moveToCoordinates(coordX, coordY) {
		this.positionX = Number(coordX);
		this.positionY = Number(coordY);
		this.imageControl.nativeElement.style.backgroundPositionX = this.positionX + '%';
		this.imageControl.nativeElement.style.backgroundPositionY = this.positionY + '%';
	}
	saveCoordinates() {
		this.centralX = this.positionX;
		this.centralY = this.positionY;
		this.moveCenter();
	}
}
