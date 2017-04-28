import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'navigation',
    templateUrl: './views/navigation.component.html',
    styleUrls: [ './css/navigation.component.css'],
    moduleId: module.id
})
export class NavigationComponent implements OnInit {
    name = 'Angular 4';
    ngOnInit(): void {

    }
}
