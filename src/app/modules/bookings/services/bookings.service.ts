import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class BookingsService {
	constructor(protected http: HttpClient) {}

	public saveBooking(data: any): Observable<any> {
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
}
