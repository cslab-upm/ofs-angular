import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
	selector: 'user-form',
	templateUrl: './user-form.component.html',
	styleUrls: [ './user-form.component.scss' ]
})
export class UserFormComponent {
	@Output() formSubmit = new EventEmitter();
	constructor() {}

	userForm = new FormGroup(
		{
			firstName: new FormControl('', Validators.required),
			lastName: new FormControl('', Validators.required),
			email: new FormControl('', [ Validators.required, Validators.email ]),
			password: new FormControl('', Validators.required),
			repeatPassword: new FormControl('', Validators.required),
			recaptchaReactive: new FormControl('', Validators.required)
		},
		this.checkPasswords
	);

	checkPasswords(group: FormGroup) {
		let pass = group.controls.password.value;
		let confirmPass = group.controls.repeatPassword.value;

		return pass === confirmPass ? null : { notSame: true };
	}

	onSubmit() {
		this.formSubmit.emit(this.userForm.value);
	}
}
