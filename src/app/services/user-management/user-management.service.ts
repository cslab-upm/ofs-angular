import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserManagementService {
	userData: any = null;
	isLoggedIn: boolean;
	constructor(protected http: HttpClient) {}

	public register(usuario: any): Observable<any> {
		return this.http.post('http://localhost:5000/users', usuario);
	}

	public checkByEmail(email: any): any {
		return this.http.get('http://localhost:5000/users/check/' + email);
	}
	public getById(userId: any): any {
		return this.http.get('http://localhost:5000/users/' + userId);
	}
}
