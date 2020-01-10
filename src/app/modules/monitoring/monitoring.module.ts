import { ImagePanelComponent } from '../../components/imagePanel/imagePanel.component';
import { GrafanaDashboardComponent } from '../../components/grafanaDashboard/grafanaDashboard.component';
import { NgModule } from '@angular/core'
import { MonitoringRoutingModule } from './monitoring-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ImagePanelComponent,
        GrafanaDashboardComponent,
    ],
    imports: [
        MonitoringRoutingModule,
        CommonModule
    ],
})
export class MonitoringModule { }
