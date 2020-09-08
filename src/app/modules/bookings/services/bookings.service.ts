import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
@Injectable({
	providedIn: 'root'
})
export class BookingsService {
	currentBooking: any;
	constructor(protected http: HttpClient) {}

	public saveBooking(data: any): Observable<any> {
    console.log("data",data)
		return this.http.post('http://localhost:5000/bookings/', data);
	}
	public updateBooking(bookingId: String, data: any): Observable<any> {
		return this.http.patch('http://localhost:5000/bookings/' + bookingId, data);
	}
	public getBookings(): Observable<any> {
		return this.http.get('http://localhost:5000/bookings/');
	}
	public deleteBooking(bookingId: string): Observable<any> {
		return this.http.delete('http://localhost:5000/bookings/' + bookingId);
	}

	public getCurrentBooking(): Observable<any> {
		return new Observable((observer) => {
			console.log('Current Booking', this.currentBooking);
			if (this.currentBooking) {
				if (moment(this.currentBooking['end']).isAfter(moment())) {
					return observer.next(this.currentBooking);
				}
			}
			this.http.get('http://localhost:5000/bookings/current').subscribe(
				(result) => {
					this.currentBooking = result;
					observer.next(result);
				},
				(error) => observer.error(error)
			);
		});
	}
}
