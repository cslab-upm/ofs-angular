import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { ControlsRoutingModule } from './controls.routing.module';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [ MainComponent, ButtonsComponent ],
	imports: [ CommonModule, ControlsRoutingModule, FontAwesomeModule, NgbModule ]
})
export class ControlsModule {}
