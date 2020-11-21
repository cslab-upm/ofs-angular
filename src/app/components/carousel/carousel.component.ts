import { Component, OnInit } from '@angular/core';
import { CamerasService } from '../../modules/monitoring/services/cameras/cameras.service';

@Component({
	selector: 'carousel',
	templateUrl: './carousel.component.html',
	styleUrls: [ './carousel.component.scss' ]
})
export class CarouselComponent implements OnInit {
	loading = true;
	cameras: Array<any>;

	onSlide(e) {}
	pauseOnHover() {}
	constructor(private camerasService: CamerasService) {}

	async ngOnInit() {
		this.camerasService
			.getCameras()
			.then((result) => {
				this.cameras = result;
			})
			.catch((error) => {
				this.cameras = [
					{ image: 'assets/img/error/404.png' },
				];
			});
		this.loading = false;
	}
}
