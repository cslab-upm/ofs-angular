import { Component, OnInit } from '@angular/core';
import { CamerasService } from '../../services/cameras.service';

@Component({
    selector: 'imagePanel',
    templateUrl: './imagePanel.component.html',
    styleUrls: ['./imagePanel.component.scss']
})

export class ImagePanelComponent  implements OnInit {
    loading = true; 
    cameras:Array<any>;

    constructor(private camerasService: CamerasService) {
    }

    async ngOnInit() {
        this.cameras = await this.camerasService.getCameras();
        this.loading = false;
    }
}