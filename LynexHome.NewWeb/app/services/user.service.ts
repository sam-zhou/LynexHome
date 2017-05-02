import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/add/operator/map';
import { User } from '../models/user.model';


@Injectable()
export class UserService {
    user: User;

    getUserPromise: Promise<User> = null;

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

    getUser(authorizeCheck?: boolean): Promise<User> {

        if (authorizeCheck !== undefined && !authorizeCheck) {
            return this.apiService.resolve(null);
        }

        if (this.user && this.user.id) {
            return this.apiService.resolve(this.user);
        };

        return this.getUserFromServer();
    };
}