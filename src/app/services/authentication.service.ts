import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
// import * as moment from 'moment';
@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	isUserLogged: boolean;
	userData: object;

	isLoggedChange: Subject<boolean> = new Subject<boolean>();
	userDataChange: Subject<object> = new Subject<Object>();

	constructor(protected http: HttpClient) {
		this.isLoggedChange.subscribe(this.setIsUserLogged);
		this.userDataChange.subscribe(this.setUserData);
	}
	setIsUserLogged(value) {
    this.isUserLogged = value;
	}
	setUserData(value) {
		this.userData = value;
	}
	login(user: string, pass: string) {
		const body = { email: user, password: pass };
		const res = this.http.post<Object>('http://localhost:3600/auth', body);
		res.subscribe((res) => {
      this.setSession(res);
			this.isLoggedChange.next(localStorage.getItem('accessToken') ? true : false);
		});
		return res;
	}

	private setSession(authResult) {
		localStorage.setItem('accessToken', authResult.accessToken);
		localStorage.setItem('refreshToken', authResult.refreshToken);
	}
	logout() {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		this.updateIsLoggedChange();
  }

  public updateIsLoggedChange(){
    this.isLoggedChange.next(localStorage.getItem('accessToken') ? true : false);
  }
  public updateUserDataChange(){
    this.userDataChange.next(this.getUserData());
  }

	getExpiration() {
		const expiration = localStorage.getItem('expires_at');
		const expiresAt = JSON.parse(expiration);
		// return moment(expiresAt);
	}

	getUserData():object {
		let token = localStorage.getItem('accessToken');
		if (token) {
			try {
				return JSON.parse(decodeURIComponent(escape(atob(token.split('.')[1]))));
			} catch (error) {
				console.log("errorUserData",error);
			}
		} else {
			return null;
		}
	}
}
