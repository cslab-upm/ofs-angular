import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService implements OnInit {
	isUserLogged: boolean;
	userData: object;

	isLoggedChange: Subject<boolean> = new Subject<boolean>();
	userDataChange: Subject<object> = new Subject<Object>();

	constructor(protected http: HttpClient) {
		this.isLoggedChange.subscribe(this.setIsUserLogged);
		this.userDataChange.subscribe(this.setUserData);
	}
	ngOnInit() {
		this.updateIsLoggedChange;
		this.updateUserDataChange;
	}
	private setIsUserLogged(value) {
		this.isUserLogged = value;
	}
	private setUserData(value) {
		this.userData = value;
	}

	public login(user: string, pass: string): Observable<any> {
		return this.http.post('http://localhost:5000/auth', { email: user, password: pass });
	}

	public register(user: any): Observable<any> {
		return this.http.post('http://localhost:5000/users', user);
	}

	public logout() {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
	}
	public setSession(authResult) {
		localStorage.setItem('accessToken', authResult.accessToken);
		localStorage.setItem('refreshToken', authResult.refreshToken);
	}

	public updateIsLoggedChange() {
		this.isLoggedChange.next(localStorage.getItem('accessToken') ? true : false);
	}
	public updateUserDataChange() {
		this.userDataChange.next(this.getUserData());
	}
	getExpiration() {
		const expiration = localStorage.getItem('expires_at');
		const expiresAt = JSON.parse(expiration);
		console.log(expiresAt);
		// return moment(expiresAt);
	}
	public getAuthenticationToken() {
		return localStorage.getItem('accessToken');
	}
	getUserData(): object {
		let token = localStorage.getItem('accessToken');
		if (token) {
			try {
				return JSON.parse(decodeURIComponent(escape(atob(token.split('.')[1]))));
			} catch (error) {
				console.log('errorUserData', error);
			}
		}
	}
}
