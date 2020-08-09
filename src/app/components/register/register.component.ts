import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../user';
import { userInfo } from 'os';
import { UserManagementService } from 'src/app/services/user-management.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit {
	@Input() firstName: string = 'Gabriel';
	@Input() lastName: string = 'Castro Muñoz';
	@Input() email: string = 'gabcas28@gmail.com';
	@Input() password: string = 's3cr3tp4sswo4rd';
	@Input() repeat_password: string = 's3cr3tp4sswo4rd';

	constructor(
		protected userService: UserManagementService,
		protected authService: AuthenticationService,
		private router: Router
	) {}

	ngOnInit() {}
	register(): void {
		let usuario = this.fillUser();
		this.userService.register(usuario).subscribe(
			(data) => {
				// Success
				console.log('Register Successful');
				console.log('data', data);
				this.authService.login(usuario.email, usuario.password).subscribe(
					(data) => {
						// Success
						this.authService.setSession(data);
						console.log('Login Successful');
						this.router.navigateByUrl('/');
					},
					(error) => {
						console.log('Error en Login');
						console.error(error);
					}
				);
				this.router.navigateByUrl('/');
			},
			(error) => {
				console.log('Error en Login');
				console.error(error);
			}
		);
	}
	fillUser(): User {
		let usuario: User = new User();
		usuario.firstName = this.firstName;
		usuario.lastName = this.lastName;
		usuario.password = this.password;
		usuario.email = this.email;
		return usuario;
	}
}
