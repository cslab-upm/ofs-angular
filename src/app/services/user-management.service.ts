import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class UserManagementService {
	userData: any = null;
	isLoggedIn: boolean;
	constructor(protected http: HttpClient, protected authService: AuthenticationService) {
		this.authService.isLoggedChange.subscribe(this.setLoggedIn);
	}

	public register(usuario) {
		const res = this.http.post<Object>('http://localhost:3600/users', usuario);
		return res;
	}

  setLoggedIn(value){
    this.isLoggedIn = value;
  }
}
