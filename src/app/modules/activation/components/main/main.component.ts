import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivationService } from '../../services/activation.service';
import { UserManagementService } from 'src/app/services/user-management/user-management.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		protected activationService: ActivationService,
		protected userService: UserManagementService,
		private router: Router
	) {}

	ngOnInit(): void {
		let codeId = this.route.snapshot.params['codeId'];
		if (codeId) {
			this.activationService.sendCodeId(codeId).subscribe(
				(data) => {
					console.log('activeData', data);
					this.router.navigateByUrl('/activar/exito');
				},
				(error) => {
					console.log('error', error);
					this.router.navigateByUrl('/activar/fallo');
				}
			);
		}
	}
	sendEmail = (value) => {
		console.log('value', value);
		this.userService.checkByEmail(value.email).subscribe((exists) => {
			exists
				? this.activationService.sendVerificationEmail(value.email).subscribe((data) => {
						alert('Mensaje enviado, comprueba to bandeja de entrada');
						this.router.navigateByUrl('/');
					})
				: alert('El email introducido no se encuentra en nuestra base de datos');
		});
	};
}
