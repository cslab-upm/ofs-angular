import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { faChevronLeft, faChevronRight, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
@Component({
	selector: 'buttons',
	templateUrl: './buttons.component.html',
	styleUrls: [ './buttons.component.scss' ]
})
export class ButtonsComponent implements OnInit {
	faEdit;
	faChevronLeft;
	faChevronRight;
	faChevronUp;
	faChevronDown;
	faCircle;

	@Output() onUp = new EventEmitter();
	@Output() onDown = new EventEmitter();
	@Output() onRight = new EventEmitter();
	@Output() onLeft = new EventEmitter();
  @Output() onCenter = new EventEmitter();

	constructor() {
		this.faChevronLeft = faChevronLeft;
		this.faChevronRight = faChevronRight;
		this.faChevronUp = faChevronUp;
		this.faChevronDown = faChevronDown;
		this.faCircle = faCircle;
	}

	ngOnInit(): void {}
	alert($value) {
		alert($value);
	}
	handleClickUp() {
		this.onUp.emit();
	}
	handleClickDown() {
		this.onDown.emit();
	}
	handleClickLeft() {
		this.onLeft.emit();
	}
	handleClickRight() {
		this.onRight.emit();
	}
	handleClickCenter() {
		this.onCenter.emit();
	}
}
