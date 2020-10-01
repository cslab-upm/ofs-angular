import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookingsService } from '../modules/bookings/services/bookings.service';
import { AuthenticationService } from '../services/authentication/authentication.service';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class HasCurrentBookingGuard implements CanActivate {
	constructor(
		private authService: AuthenticationService,
		protected router: Router,
		protected bookingsService: BookingsService
	) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return new Observable((observer) => {
			this.bookingsService.getCurrentBooking().subscribe(
				(result) => {
					observer.next(
						result && result['extendedProps']['userId'] === this.authService.getUserData()['userId']
							? true
							: this.router.parseUrl('/error/no-reservation')
					);
				},
				(error) => observer.next(this.router.parseUrl('/error/500'))
			);
		});
	}
}
