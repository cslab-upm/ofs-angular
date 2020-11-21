import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'passwordform',
	templateUrl: './password-form.component.html',
	styleUrls: [ './password-form.component.scss' ]
})
export class PasswordFormComponent {
	@Output() formSubmit = new EventEmitter();
	passwordForm = new FormGroup(
		{
			password: new FormControl('', [ Validators.required ]),
			repeatPassword: new FormControl('', [ Validators.required ])
		},
		this.checkPasswords
	);
	constructor() {}
	onSubmit() {
		this.formSubmit.emit(this.passwordForm.value);
	}
	checkPasswords(group: FormGroup) {
		let pass = group.controls.password.value;
		let confirmPass = group.controls.repeatPassword.value;

		return pass === confirmPass ? null : { notSame: true };
	}
}
