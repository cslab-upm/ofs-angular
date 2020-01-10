import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../services/equipment.service';

@Component({
    selector: 'equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.scss']

})

export class EquipmentComponent implements OnInit {
    equipment: Array<any>;
    showingEquipment: Array<any>;
    selectedType = 'all';

    constructor(private equipmentService: EquipmentService) {
    }
    
    ngOnInit() {
        this.equipment = this.equipmentService.getEquipment();
        this.showingEquipment = this.equipment;
    }

    filterEquipment(type) {
        this.selectedType = type;
        switch (type) {
            case 'all':
                this.showingEquipment = this.equipment;
                break;
            case 'telescopes':
                this.showingEquipment = this.equipment.filter(device => device.type === 'telescope');
                break;
            case 'cameras':
                    this.showingEquipment = this.equipment.filter(device => device.type === 'camera');
                    break;
            case 'sensors':
                    this.showingEquipment = this.equipment.filter(device => device.type === 'sensor');
                    break;
            default:
                break;
        }
    }
}