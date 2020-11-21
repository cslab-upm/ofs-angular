import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImagePanelComponent } from './components/imagePanel/imagePanel.component'
import { GrafanaDashboardComponent } from './components/grafanaDashboard/grafanaDashboard.component'

const routes: Routes = [
    { path: 'camaras', component: ImagePanelComponent },
    { path: 'estacion-meteorologica', component: GrafanaDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
