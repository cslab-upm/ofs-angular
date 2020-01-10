import { Component, OnInit } from '@angular/core';
import { CamerasService } from '../../services/cameras.service';

@Component({
    selector: 'carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit {
    loading = true; 
    cameras:Array<any>;

    constructor(private camerasService: CamerasService) {
    }

    async ngOnInit() {
        this.cameras = await this.camerasService.getCameras();
        this.loading = false;
    }
}