import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CamerasService } from '../../services/cameras/cameras.service';

@Component({
	selector: 'imagePanel',
	templateUrl: './imagePanel.component.html',
	styleUrls: [ './imagePanel.component.scss' ]
})
export class ImagePanelComponent implements OnInit {
	loading: boolean;
	cameras: Array<any>;

	constructor(private camerasService: CamerasService, private router: Router) {}

	async ngOnInit() {
		this.loading = true;
		this.camerasService
			.getCameras()
			.then((result) => {
        this.loading = false;
				this.cameras = result;
			})
			.catch((error) => {
        this.loading = false;
				this.router.navigateByUrl('/error/not-available');
			});
	}
}
