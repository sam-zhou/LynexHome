import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';


@Component({
    selector: 'navigation',
    templateUrl: 'views/navigation.component.html',
    styleUrls: [ 'css/navigation.component.css'],
    moduleId: module.id
})
export class NavigationComponent implements OnInit {

    isCollapsed: boolean = true;

    ngOnInit(): void {
        
    }
}
