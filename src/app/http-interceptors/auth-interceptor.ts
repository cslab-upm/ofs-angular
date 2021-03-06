import { AuthenticationService } from '../services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private auth: AuthenticationService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		// Get the auth token from the service.
		const authToken = this.auth.getAuthenticationToken();
    console.log("AuthToken", authToken? true:false);
		// Clone the request and replace the original headers with
		// cloned headers, updated with the authorization.
		const authReq = req.clone({
			headers: req.headers.set('Authorization', 'Bearer '+ authToken)
		});

		// send cloned request with header to the next handler.
		return next.handle(authReq);
	}
}
