import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
	selector: 'activation-form',
	templateUrl: './form.component.html',
	styleUrls: [ './form.component.scss' ]
})
export class FormComponent {
	@Output() formSubmit = new EventEmitter();
	activationForm = new FormGroup({
		email: new FormControl('', [ Validators.required, Validators.email ])
	});
	constructor() {}
	onSubmit() {
		this.formSubmit.emit(this.activationForm.value);
	}
}
