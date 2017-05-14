import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';


@Component({
    selector: 'lynex-app',
    templateUrl: 'views/lynex.component.html',
    styleUrls: [ 'css/lynex.component.css'],
    moduleId: module.id
})
export class LynexComponent implements OnInit {


    constructor(private userService: UserService) {

    }

    ngOnInit(): void {
        
    }
}
