import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
	selector: 'firstNameForm',
	templateUrl: './firstNameForm.component.html',
	styleUrls: [ './firstNameForm.component.scss' ]
})
export class FirstNameFormComponent {
	@Output() formSubmit = new EventEmitter();
	firstNameForm = new FormGroup({
		firstName: new FormControl('', [ Validators.required ])
	});
	constructor() {}
	onSubmit() {
		this.formSubmit.emit(this.firstNameForm.value);
	}
}
