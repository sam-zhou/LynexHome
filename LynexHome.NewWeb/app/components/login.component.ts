import { Component, OnInit  } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
    selector: 'login',
    templateUrl: 'views/login.component.html',
    styleUrls: [ 'css/login.component.css'],
    moduleId: module.id
})
export class LoginComponent implements OnInit {
    user: User = null;

    isAuthenticated(): boolean {
        if (this.user) {
            return this.user.isAuthenticated()
        }
        return false;
    }

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.getUser().then(response => this.user = response);
    }
}
