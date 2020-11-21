import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
	selector: 'lastNameForm',
	templateUrl: './lastNameForm.component.html',
	styleUrls: [ './lastNameForm.component.scss' ]
})
export class LastNameFormComponent {
	@Output() formSubmit = new EventEmitter();
	lastNameForm = new FormGroup({
		lastName: new FormControl('', [ Validators.required ])
	});
	constructor() {}
	onSubmit() {
		this.formSubmit.emit(this.lastNameForm.value);
	}
}
