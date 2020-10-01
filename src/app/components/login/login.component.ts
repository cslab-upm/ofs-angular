import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
	@Input() user: string;
	@Input() password: string;

	constructor(protected authService: AuthenticationService, private router: Router) {}

	ngOnInit() {}

	login(): void {
		this.authService.login(this.user, this.password).subscribe(
			(data) => {
				this.authService.setSession(data);
				this.authService.updateIsLoggedChange();
				this.authService.updateUserDataChange();
				this.router.navigateByUrl('/');
			},
			(error) => {
				error.status === 0 || error.status === 500
					? this.router.navigateByUrl('/error/500')
					: alert('Error en Login');
				console.error('Error en Login', error);
			}
		);
	}
}
