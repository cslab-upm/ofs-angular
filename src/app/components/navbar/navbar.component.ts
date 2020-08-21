import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.scss' ]
})
export class NavbarComponent implements OnInit {
	isNavbarCollapsed: boolean;
	isLoggedIn: boolean;
	userData: object;
	userName: string;
	logout: Function;
	constructor(protected authService: AuthenticationService, private router: Router) {
		this.isNavbarCollapsed = true;
		this.authService.isLoggedChange.subscribe((value) => {
			this.isLoggedIn = value;
		});
		this.authService.userDataChange.subscribe((value) => {
			this.userData = value ? value : undefined;
			this.userName = value ? value['name'] : undefined;
		});
		this.logout = () => {
			this.authService.logout();
			this.authService.updateIsLoggedChange();
			this.authService.updateUserDataChange();
			this.router.navigateByUrl('/');
		};
	}
	ngOnInit() {
		this.authService.updateIsLoggedChange();
		this.authService.updateUserDataChange();
	}
}
