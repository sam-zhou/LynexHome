import { Component, Directive, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
    selector: 'account',
    templateUrl: 'views/account.component.html',
    styleUrls: ['css/account.component.css'],
    moduleId: module.id
})
export class AccountComponent implements OnInit {

    isBusy: boolean = true;

    constructor(private userService: UserService) {

    }




    ngOnInit(): void {
        

        this.isBusy = false;
    }

}
