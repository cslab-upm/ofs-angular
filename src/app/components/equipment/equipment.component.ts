import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../services/equipment.service';

@Component({
	selector: 'equipment',
	templateUrl: './equipment.component.html',
	styleUrls: [ './equipment.component.scss' ]
})
export class EquipmentComponent implements OnInit {
	equipment: Array<any>;
	showingEquipment: Array<any>;
	selectedType = 'all';
	types = [
		{ type: 'all', label: 'Todos' },
		{ type: 'sensor', label: 'Sensores' },
		{ type: 'telescope', label: 'Telescopios' },
		{ type: 'camera', label: 'Cámaras' }
	];

	constructor(private equipmentService: EquipmentService) {}

	ngOnInit() {
		this.equipment = this.equipmentService.getEquipment();
		this.showingEquipment = this.equipment;
	}

	filterEquipment(type) {
		this.selectedType = type;
		if (type === 'all') {
			this.showingEquipment = this.equipment;
		} else {
			this.showingEquipment = this.equipment.filter((device) => device.type === type);
		}
	}
}
