import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormsModule } from '@angular/forms';
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
        // Success
        console.log("data",data)
        this.authService.setSession(data);
				console.log('Login Successful');
				this.router.navigateByUrl('/');
			},
			(error) => {
				console.log('Error en Login');
				console.error(error);
			}
		);
	}
}
