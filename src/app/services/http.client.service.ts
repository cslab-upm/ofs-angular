// import { Injectable } from '@angular/core';

// import { HttpClient} from '@angular/common/http';

// @Injectable()
// export class HttpClient {
// 	constructor(private http: HttpClient) {}

// 	createAuthorizationHeader(headers: Headers) {
// 		headers.append('authorization', 'Bearer ' + localStorage.getItem('accessToken'));
// 	}

// 	get(url) {
// 		let headers = new Headers();
// 		this.createAuthorizationHeader(headers);
// 		return this.http.get(url, {
// 			headers: headers
// 		});
// 	}

// 	post(url, data) {
// 		let headers = new Headers();
// 		this.createAuthorizationHeader(headers);
// 		return this.http.post(url, data, {
// 			headers: headers
// 		});
// 	}
// }
