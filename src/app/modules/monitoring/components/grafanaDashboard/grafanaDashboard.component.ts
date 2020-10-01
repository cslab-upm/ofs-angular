import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { interval, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Component({
	selector: 'grafanaDashboard',
	templateUrl: './grafanaDashboard.component.html',
	styleUrls: [ './grafanaDashboard.component.scss' ]
})
export class GrafanaDashboardComponent {
	constructor(protected http: HttpClient, private router: Router) {}
	loading: boolean;
	ngOnInit() {
		this.loading = true;
		this.http
			.get('http://138.100.9.248:3000/d/K8Xy2H-Zk/weather-station?orgId=1&from=1575655609356&to=1575655909356', {
				observe: 'response'
			})
			.pipe(
				timeout(2000),
				catchError(() => {
					// do something on a timeout
					this.router.navigateByUrl('/error/not-available');
					return of(null);
				})
			)
			.subscribe(
				(resp) => {
					if (resp.status === 200) {
						this.loading = false;
					} else {
						this.router.navigateByUrl('/error/not-available');
					}
				},
				(err) => this.router.navigateByUrl('/error/not-available')
			);
	}
}
