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

	public register(usuario: any): Observable<any> {
		return this.http.post('http://localhost:3600/users', usuario);
	}

	public checkByEmail(email: any): any{
		return this.http.get('http://localhost:3600/users/check/'+email);
	}
	public getById(userId: any): any {
		return this.http.get('http://localhost:3600/users/'+ userId);
	}

	setLoggedIn(value) {
		this.isLoggedIn = value;
	}
}
