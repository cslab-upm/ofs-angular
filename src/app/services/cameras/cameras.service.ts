import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class CamerasService {
    devices: Array<String>;
    apiUrl = 'http://localhost:5000/images';

    constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    }

    async getDevices() {
        this.devices = Object.keys(await this.getStatus());
        return this.devices;
    }

    async getStatus() {
        return await this.http.get(`${this.apiUrl}/status`).toPromise();
    }

    async getCameraImg(deviceName) {
        let imageBlob = await this.http.get(`${this.apiUrl}${deviceName}`, { responseType: 'blob' }).toPromise();
        let imageURL = URL.createObjectURL(imageBlob);
        let image = this.sanitizer.bypassSecurityTrustUrl(imageURL);
        return image;
    }

    async getCameras() {
        let cameras = [];
        let devices = await this.getDevices();

        for(let device of devices) {
            let image = await this.getCameraImg(device);
            cameras.push({
                name: this.transformName(device),
                image: image,
            })
        }
        return cameras;
    }

    transformName(device) {
        let name = device.split("/")[1];
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
}
