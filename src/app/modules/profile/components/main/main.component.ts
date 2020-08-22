import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from 'src/app/services/user-management/user-management.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: [ './main.component.scss' ]
})
export class MainComponent implements OnInit {
	user: object;
	userId: string;
	changePassword: boolean;
	changeLastName: boolean;
	changeFirstName: boolean;
	changeEmail: boolean;
	faEdit;
	constructor(
		protected authService: AuthenticationService,
		protected userService: UserManagementService,
		private router: Router
	) {
		this.faEdit = faEdit;
	}

	ngOnInit() {
		this.userId = this.authService.getUserData()['userId'];
		this.userService.getById(this.userId).subscribe((data) => {
			this.user = data;
		});
		this.closeAll();
	}
	edit(value) {
		alert('hey');
	}
	toggleChangePassword = () => {
		this.changePassword ? '' : this.closeAll();
		this.changePassword = this.changePassword ? false : true;
	};
	toggleChangeLastName = () => {
		this.changeLastName ? '' : this.closeAll();
		this.changeLastName = this.changeLastName ? false : true;
	};
	toggleChangeFirstName = () => {
		this.changeFirstName ? '' : this.closeAll();
		this.changeFirstName = this.changeFirstName ? false : true;
	};
	toggleChangeEmail = () => {
		this.changeEmail ? '' : this.closeAll();
		this.changeEmail = this.changeEmail ? false : true;
	};
	closeAll = () => {
		this.changePassword = false;
		this.changeLastName = false;
		this.changeFirstName = false;
		this.changeEmail = false;
	};
	submit(value) {
		this.userService.patchById(this.userId, value).subscribe(
			(result) => {
				console.log('result', result);
				alert('Cambios guardados');
				this.ngOnInit();
			},
			(error) => {
				console.log('error', error);
			}
		);
	}
}
