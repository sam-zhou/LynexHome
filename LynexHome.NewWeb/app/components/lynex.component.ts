import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'lynex-app',
    templateUrl: './views/lynex.component.html',
    styleUrls: [ './css/lynex.component.css'],
    moduleId: module.id
})
export class LynexComponent implements OnInit {
    name = 'Angular 4';
    ngOnInit(): void {

    }
}
