import { NgModule } from '@angular/core'
import { EquipmentRoutingModule } from './equipment-routing.module';
import { CommonModule } from '@angular/common';
import { EquipmentComponent } from 'src/app/components/equipment/equipment.component';

@NgModule({
    declarations: [
        EquipmentComponent
    ],
    imports: [
        EquipmentRoutingModule,
        CommonModule
    ],
})
export class EquipmentModule {
    
}
