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
	centralX;
	centralY;
	positionY;
	positionX;
	key;
	fullScreen;
	endTime;
	timer;
	constructor(protected bookingService: BookingsService, protected router: Router) {
		this.centralX = 50;
		this.centralY = 50;
		this.positionY = this.centralX;
		this.positionX = this.centralY;

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
		console.log($value);
		if ($value === 'moon') {
			this.centralX = 70;
			this.centralY = 30;
		}
		if ($value === 'sun') {
			this.centralX = 50;
			this.centralY = 50;
		}
		if ($value === 'mars') {
			this.centralX = 25;
			this.centralY = 25;
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
