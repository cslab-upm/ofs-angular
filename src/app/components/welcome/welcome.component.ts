import { Component } from '@angular/core';

@Component({
    selector: 'welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent {
    small = this.multipleBoxShadow(700);
    medium = this.multipleBoxShadow(200);
    big = this.multipleBoxShadow(100); 

    multipleBoxShadow(n) {
        let value = Math.floor(Math.random()*2000) + "px " + Math.floor(Math.random()*2000) + "px " + "#FFF";
        for (let index = 2; index < n; index++) {
            value = value + " , " +Math.floor(Math.random()*2000) + "px " + Math.floor(Math.random()*2000) + "px " + "#FFF";
        }
        return value; 
    }
}