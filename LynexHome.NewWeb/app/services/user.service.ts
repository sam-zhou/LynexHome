import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/add/operator/map';
import { User } from '../models/user.model';


@Injectable()
export class UserService {
    user: User = null;

    constructor(private apiService: ApiService) {

    }

    private getUserFromServer(): Promise<User> {
        var promise = this.apiService.getData("Authentication", "GetUser");


        return promise.then(
            response => {
                if (response && response.success) {
                    this.user = new User(response.results);
                    console.log(this.user);
                    this.apiService.resolve(this.user);
                } else {
                    this.apiService.reject(null);
                }
                return this.user;
            }
        );
    }

    getUser(): Promise<User> {
        if (this.user !== null && this.user.id) {
            return this.apiService.resolve(this.user);
        };

        return this.getUserFromServer();
    };
}