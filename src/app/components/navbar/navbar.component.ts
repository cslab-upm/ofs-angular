import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable, Subscription } from 'rxjs';

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
	constructor(protected authService: AuthenticationService) {
		this.isNavbarCollapsed = true;
		this.authService.isLoggedChange.subscribe((value) => {
			this.isLoggedIn = value;
			console.log('val', value);
			this.authService.updateIsLoggedChange();
			this.authService.updateUserDataChange();
		});
		this.authService.userDataChange.subscribe((value) => {
			this.userData = value;
			this.userName = value['name'];
			this.authService.updateIsLoggedChange();
			this.authService.updateUserDataChange();
			console.log('userData', value);
		});
		this.logout = () => {
			this.authService.logout();
    };

	}
	ngOnInit() {}
}
