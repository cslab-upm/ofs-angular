import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class RecoveryService {
	constructor(protected http: HttpClient) {}
	public sendPasswordRecoveryEmail(email: string): Observable<any> {
		return this.http.get('http://localhost:5000/recovery/sendemail/' + email);
	}

	public setNewPasword(recoveryCode: any, data: string): Observable<any> {
		return this.http.post('http://localhost:5000/recovery/' + recoveryCode, data);
	}
}
