import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
	@Input() user: string = 'gabcas28@gmail.com';
	@Input() password: string = 's3cr3tp4sswo4rd';

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
				alert('Error en Login');
				console.error('Error en Login',error);
			}
		);
	}
}
