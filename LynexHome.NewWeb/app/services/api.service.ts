import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    getParamValues(param: Object): string {

        if (!param)
            return null;

        var paramValues = "";

        if (Array.isArray(param)) {
            // we will look for name and value properties
            for (var i = 0; i < param.length; i++) {
                var p = param[i];
                if (p) {
                    if (p.name !== undefined && p.value !== undefined) {

                        if (paramValues != "") {
                            paramValues += "&";
                        }

                        //quote strings
                        if (typeof (p.value) == 'string')
                            p.value = '"' + p.value + '"';

                        paramValues += p.name + "=" + p.value;
                    }
                }
            }

            if (paramValues != "") {
                paramValues = "?" + paramValues;
            }

        } else {
            paramValues = param.toString(); // single value
        }

        return paramValues;
    },

    postData(controller: string, action: string, data: Object): Promise<any> {
        return $http(
            {
                url: uri + '/' + controller + "/" + action,
                method: "POST",
                cache: false,
                data: data,
            }).then(function (response) {
                return response.data;
            });
    },
}