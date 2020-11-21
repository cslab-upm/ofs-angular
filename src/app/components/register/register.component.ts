import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/services/user-management/user-management.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ActivationService } from 'src/app/modules/activation/services/activation.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent {
	constructor(
		protected userService: UserManagementService,
		protected authService: AuthenticationService,
		protected activationService: ActivationService,
		private router: Router
	) {}

	register(usuario): void {
		console.log(usuario);
		this.userService.checkByEmail(usuario.email).subscribe((result) => {
			if (result) {
				alert('El usuario introducido ya está registrado.');
				return;
			}
			this.userService.register(usuario).subscribe((data) => {
				// Success
				console.log('Register Successful');
				usuario.userId = data.id;
				this.activationService.sendVerificationEmail(usuario.email).subscribe(
					(data) => {
						alert('Hemos enviado un email de confirmación, por favor verifica tu bandeja de entrada');
					},
					(error) => {
						alert('Error al enviar mensaje');
					}
				);

				this.router.navigateByUrl('/');
			});
		});
	}
}
