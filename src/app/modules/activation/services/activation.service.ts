import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ActivationService {
	constructor(protected http: HttpClient) {}

  public sendCodeId(codeId: any): Observable<any> {
		return this.http.get('http://localhost:5000/activation/' + codeId);
  }
  public sendVerificationEmail(email: string): Observable<any> {
		return this.http.get('http://localhost:5000/activation/sendemail/'+email);
	}
}
