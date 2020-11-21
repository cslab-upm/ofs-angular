import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoveryService } from '../../services/recovery.service';
import { UserManagementService } from 'src/app/services/user-management/user-management.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit {
	recoveryCode = false;
	constructor(
		private route: ActivatedRoute,
		protected recoveryService: RecoveryService,
		protected userService: UserManagementService,
		private router: Router
	) {
		this.recoveryCode = false;
	}

	ngOnInit(): void {
		this.recoveryCode = this.route.snapshot.params['recoveryCode'];
	}
	sendEmail = (value) => {
		this.userService.checkByEmail(value.email).subscribe(
			(exists) => {
				exists
					? this.recoveryService.sendPasswordRecoveryEmail(value.email).subscribe((data) => {
							alert('Mensaje enviado, comprueba to bandeja de entrada');
							this.router.navigateByUrl('/');
						})
					: alert('El email introducido no se encuentra en nuestra base de datos');
			},
			(error) => {
				console.log('error', error);
				this.router.navigateByUrl('/recuperar/fallo');
			}
		);
	};
	submitPassword(value) {
		this.recoveryService.setNewPasword(this.recoveryCode, value).subscribe(
			(result) => {
				console.log('result', result);
				this.router.navigateByUrl('/recuperar/exito');
			},
			(error) => {
				console.log('error', error);
				this.router.navigateByUrl('/recuperar/fallo');
			}
		);
	}
}
