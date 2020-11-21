import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
	selector: 'recovery-form',
	templateUrl: './form.component.html',
	styleUrls: [ './form.component.scss' ]
})
export class FormComponent {
	@Output() formSubmit = new EventEmitter();
	recoveryForm = new FormGroup({
		email: new FormControl('', [ Validators.required, Validators.email ])
	});
	constructor() {}
	onSubmit() {
		this.formSubmit.emit(this.recoveryForm.value);
	}
}
