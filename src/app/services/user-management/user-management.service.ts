import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

	public checkByEmail(email: string): any {
		return this.http.get('http://localhost:5000/users/check/' + email);
	}
	public getById(userId: string): any {
		return this.http.get('http://localhost:5000/users/' + userId);
	}
	public patchById(userId: string, data: any): any {
		return this.http.patch('http://localhost:5000/users/' + userId, data);
	}
}
