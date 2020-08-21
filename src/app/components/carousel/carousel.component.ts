import { Component, OnInit } from '@angular/core';
import { CamerasService } from '../../services/cameras/cameras.service';

@Component({
    selector: 'carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})

export class CarouselComponent implements OnInit {
    loading = true;
    cameras:Array<any>;


    onSlide(e){
        console.log(e)
    }
    pauseOnHover(){
        console.log("pauseOnHover")
    }
    constructor(private camerasService: CamerasService) {
    }

    async ngOnInit() {
        this.cameras = await this.camerasService.getCameras();
        this.loading = false;
    }
}
