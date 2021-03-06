﻿import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ApiResponse } from '../models/apiresponse.model';

@Injectable()
export class ApiService {

    constructor(private http: Http) {
        
    }

    getParamValues(param: any): string {

        if (!param)
            return null;

        var paramValues = "";

        if (Array.isArray(param)) {
            // we will look for name and value properties
            for (var i = 0; i < param.length; i++) {
                var p = param[i];
                if (p) {
                    if (p.name !== undefined && p.value !== undefined) {

                        if (paramValues !== "") {
                            paramValues += "&";
                        }

                        //quote strings
                        if (typeof (p.value) === 'string')
                            p.value = '"' + p.value + '"';

                        paramValues += p.name + "=" + p.value;
                    }
                }
            }

            if (paramValues !== "") {
                paramValues = "?" + paramValues;
            }

        } else {
            paramValues = param.toString(); // single value
        }

        return paramValues;
    };

    reject(object: any): Promise<any> {
        return Promise.reject(object);
    }

    resolve(object: any): Promise<any> {
        return Promise.resolve(object);
    };

    postData(controller: string, action: string, data: any): Promise<ApiResponse> {
        return this.http.post('/api/' + controller + '/' + action + '/', data)
            .map(response => response.json() as ApiResponse)
            .toPromise()
            .catch(this.handleError);
    };


    getData(controller: string, action: string, data?: any): Promise<ApiResponse> {
        var url = null;
        if (data) {
            url = '/api/' + controller + '/' + action + '/' + this.getParamValues(data);
        } else {
            url = '/api/' + controller + '/' + action + '/';
        }


        return this.http.get(url)
            .map(response => response.json() as ApiResponse)
            .toPromise()
            .catch(this.handleError);;
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}