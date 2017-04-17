common.factory('toolService', ["settings", "$q",
    function (settings, $q) {

        var base64 = {
            // private property
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            // public method for encoding
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
                input = base64._utf8_encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output +
                        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
                }
                return output;
            },
            // public method for decoding
            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                while (i < input.length) {
                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    output = output + String.fromCharCode(chr1);
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                }
                output = base64._utf8_decode(output);
                return output;
            },
            // private method for UTF-8 encoding
            _utf8_encode: function (string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";
                for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                }
                return utftext;
            },
            // private method for UTF-8 decoding
            _utf8_decode: function (utftext) {
                var string = "";
                var i = 0;
                var c = c1 = c2 = 0;
                while (i < utftext.length) {
                    c = utftext.charCodeAt(i);
                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    } else if ((c > 191) && (c < 224)) {
                        c2 = utftext.charCodeAt(i + 1);
                        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                        i += 2;
                    } else {
                        c2 = utftext.charCodeAt(i + 1);
                        c3 = utftext.charCodeAt(i + 2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
                }
                return string;
            }
        }

        //Wait for final event is done. (resizing)
        var waitForFinalEvent = (function () {
            var timers = {};
            return function (callback, ms, uniqueId) {
                if (!uniqueId) {
                    uniqueId = "Don't call this twice without a uniqueId";
                }
                if (timers[uniqueId]) {
                    clearTimeout(timers[uniqueId]);
                }
                timers[uniqueId] = setTimeout(callback, ms);
            };
        })();



        var getAge = function (date) {
            var output = {
                Age: 0,
                Unit: null,
                AbbreUnit: null
            };


            var today = new Date();
            var age = today.getFullYear() - date.getFullYear();
            var m = today.getMonth() - date.getMonth();
            var d = today.getDate() - date.getDate();
            var dDif = Math.floor((today - date) / (1000 * 60 * 60 * 24));


            if (m < 0 || (m === 0 && d < 0)) {
                age--;
            }

            if (age > 0) {
                output.Age = age;
                if (age > 1) {
                    output.Unit = "Years";
                } else {
                    output.Unit = "Year";
                }
            } else if (m > 1) {
                output.Age = m;
                output.Unit = "Months";
            } else if (m === 1 && dDif >= 31) {
                output.Age = 1;
                output.Unit = "Month";
            } else if (m <= 0 && dDif >= 31) {
                var monthDif = Math.floor(dDif / 30.4375);

                output.Age = monthDif;
                if (monthDif > 1) {
                    output.Unit = "Months";
                } else {
                    output.Unit = "Month";
                }
            } else {


                if (dDif > 1) {
                    output.Age = dDif;
                    output.Unit = "Days";
                } else if (dDif == 1) {
                    output.Age = dDif;
                    output.Unit = "Day";
                } else {
                    var hourDif = Math.floor((today - date) / (1000 * 60 * 60));

                    output.Age = hourDif;
                    output.Unit = "Hour";
                    if (hourDif > 1) {
                        output.Unit += "s";
                    } else if (hourDif == 0) {
                        var minDif = Math.floor((today - date) / (1000 * 60));
                        output.Age = minDif;
                        output.Unit = "Min";
                        if (minDif > 1) {
                            output.Unit += "s";
                        } else if (hourDif == 0) {
                            output.Age = 0;
                            output.Unit = "Just now";
                        }
                    }

                }
            }
            return output;
        }

        //Calculate age
        var getAgeString = function (date) {
            if (date == "N/A") {
                return "";
            }

            var output;
            var today = new Date();
            var age = today.getFullYear() - date.getFullYear();
            var m = today.getMonth() - date.getMonth();
            var d = today.getDate() - date.getDate();
            var dDif = Math.floor((today - date) / (1000 * 60 * 60 * 24));



            if (m < 0 || (m === 0 && d < 0)) {
                age--;
            }

            if (age > 0) {
                output = "(" + age + " y)";
            } else if (m > 1) {
                output = "(" + m + " m)";
            } else if (m === 1 && dDif >= 31) {
                output = "(" + 1 + " m)";
            } else if (m <= 0 && dDif >= 31) {
                var monthDif = Math.floor(dDif / 30.4375);
                output = "(" + monthDif + " m)";
            } else {
                output = "(" + dDif + " d)";
            }
            return output;
        }


        var monthNames = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
        var dayNames = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');
        function lz(x) { return (x < 0 || x > 9 ? "" : "0") + x; }

        function isDate(val, format) {
            var date = getDateFromFormat(val, format);
            if (date == 0) { return false; }
            return true;
        }

        function compareDates(date1, dateformat1, date2, dateformat2) {
            var d1 = getDateFromFormat(date1, dateformat1);
            var d2 = getDateFromFormat(date2, dateformat2);
            if (d1 == 0 || d2 == 0) {
                return -1;
            }
            else if (d1 > d2) {
                return 1;
            }
            return 0;
        }

        function formatDate(date, format) {
            format = format + "";
            var result = "";
            var iFormat = 0;
            var c = "";
            var token = "";
            var y = date.getYear() + "";
            var M = date.getMonth() + 1;
            var d = date.getDate();
            var E = date.getDay();
            var H = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var yyyy, yy, MMM, MM, dd, hh, h, mm, ss, ampm, HH, H, KK, K, kk, k;
            // Convert real date parts into formatted versions
            var value = new Object();
            if (y.length < 4) { y = "" + (y - 0 + 1900); }
            value["y"] = "" + y;
            value["yyyy"] = y;
            value["yy"] = y.substring(2, 4);
            value["M"] = M;
            value["MM"] = lz(M);
            value["MMM"] = monthNames[M - 1];
            value["NNN"] = monthNames[M + 11];
            value["d"] = d;
            value["dd"] = lz(d);
            value["E"] = dayNames[E + 7];
            value["EE"] = dayNames[E];
            value["H"] = H;
            value["HH"] = lz(H);
            if (H == 0) { value["h"] = 12; }
            else if (H > 12) { value["h"] = H - 12; }
            else { value["h"] = H; }
            value["hh"] = lz(value["h"]);
            if (H > 11) { value["K"] = H - 12; } else { value["K"] = H; }
            value["k"] = H + 1;
            value["KK"] = lz(value["K"]);
            value["kk"] = lz(value["k"]);
            if (H > 11) { value["a"] = "PM"; }
            else { value["a"] = "AM"; }
            value["m"] = m;
            value["mm"] = lz(m);
            value["s"] = s;
            value["ss"] = lz(s);
            while (iFormat < format.length) {
                c = format.charAt(iFormat);
                token = "";
                while ((format.charAt(iFormat) == c) && (iFormat < format.length)) {
                    token += format.charAt(iFormat++);
                }
                if (value[token] != null) { result = result + value[token]; }
                else { result = result + token; }
            }
            return result;
        }

        // ------------------------------------------------------------------
        // Utility functions for parsing in getDateFromFormat()
        // ------------------------------------------------------------------
        function isInteger(val) {
            var digits = "1234567890";
            for (var i = 0; i < val.length; i++) {
                if (digits.indexOf(val.charAt(i)) == -1) { return false; }
            }
            return true;
        }
        function getInt(str, i, minlength, maxlength) {
            for (var x = maxlength; x >= minlength; x--) {
                var token = str.substring(i, i + x);
                if (token.length < minlength) { return null; }
                if (isInteger(token)) { return token; }
            }
            return null;
        }

        // ------------------------------------------------------------------
        // getDateFromFormat( date_string , format_string )
        //
        // This function takes a date string and a format string. It matches
        // If the date string matches the format string, it returns the 
        // getTime() of the date. If it does not match, it returns 0.
        // ------------------------------------------------------------------
        function getDateFromFormat(val, format) {
            val = val + "";
            format = format + "";
            var iVal = 0;
            var iFormat = 0;
            var c = "";
            var token = "";
            var token2 = "";
            var x, y;
            var now = new Date();
            var year = now.getYear();
            var month = now.getMonth() + 1;
            var date = 1;
            var hh = now.getHours();
            var mm = now.getMinutes();
            var ss = now.getSeconds();
            var ampm = "";

            while (iFormat < format.length) {
                // Get next token from format string
                c = format.charAt(iFormat);
                token = "";
                while ((format.charAt(iFormat) == c) && (iFormat < format.length)) {
                    token += format.charAt(iFormat++);
                }
                // Extract contents of value based on format token
                if (token == "yyyy" || token == "yy" || token == "y") {
                    if (token == "yyyy") { x = 4; y = 4; }
                    if (token == "yy") { x = 2; y = 2; }
                    if (token == "y") { x = 2; y = 4; }
                    year = getInt(val, iVal, x, y);
                    if (year == null) { return 0; }
                    iVal += year.length;
                    if (year.length == 2) {
                        if (year > 70) { year = 1900 + (year - 0); }
                        else { year = 2000 + (year - 0); }
                    }
                }
                else if (token == "MMM" || token == "NNN") {
                    month = 0;
                    for (var i = 0; i < monthNames.length; i++) {
                        var monthName = monthNames[i];
                        if (val.substring(iVal, iVal + monthName.length).toLowerCase() == monthName.toLowerCase()) {
                            if (token == "MMM" || (token == "NNN" && i > 11)) {
                                month = i + 1;
                                if (month > 12) { month -= 12; }
                                iVal += monthName.length;
                                break;
                            }
                        }
                    }
                    if ((month < 1) || (month > 12)) { return 0; }
                }
                else if (token == "EE" || token == "E") {
                    for (var i = 0; i < dayNames.length; i++) {
                        var dayName = dayNames[i];
                        if (val.substring(iVal, iVal + dayName.length).toLowerCase() == dayName.toLowerCase()) {
                            iVal += dayName.length;
                            break;
                        }
                    }
                }
                else if (token == "MM" || token == "M") {
                    month = getInt(val, iVal, token.length, 2);
                    if (month == null || (month < 1) || (month > 12)) { return 0; }
                    iVal += month.length;
                }
                else if (token == "dd" || token == "d") {
                    date = getInt(val, iVal, token.length, 2);
                    if (date == null || (date < 1) || (date > 31)) { return 0; }
                    iVal += date.length;
                }
                else if (token == "hh" || token == "h") {
                    hh = getInt(val, iVal, token.length, 2);
                    if (hh == null || (hh < 1) || (hh > 12)) { return 0; }
                    iVal += hh.length;
                }
                else if (token == "HH" || token == "H") {
                    hh = getInt(val, iVal, token.length, 2);
                    if (hh == null || (hh < 0) || (hh > 23)) { return 0; }
                    iVal += hh.length;
                }
                else if (token == "KK" || token == "K") {
                    hh = getInt(val, iVal, token.length, 2);
                    if (hh == null || (hh < 0) || (hh > 11)) { return 0; }
                    iVal += hh.length;
                }
                else if (token == "kk" || token == "k") {
                    hh = getInt(val, iVal, token.length, 2);
                    if (hh == null || (hh < 1) || (hh > 24)) { return 0; }
                    iVal += hh.length; hh--;
                }
                else if (token == "mm" || token == "m") {
                    mm = getInt(val, iVal, token.length, 2);
                    if (mm == null || (mm < 0) || (mm > 59)) { return 0; }
                    iVal += mm.length;
                }
                else if (token == "ss" || token == "s") {
                    ss = getInt(val, iVal, token.length, 2);
                    if (ss == null || (ss < 0) || (ss > 59)) { return 0; }
                    iVal += ss.length;
                }
                else if (token == "a") {
                    if (val.substring(iVal, iVal + 2).toLowerCase() == "am") { ampm = "AM"; }
                    else if (val.substring(iVal, iVal + 2).toLowerCase() == "pm") { ampm = "PM"; }
                    else { return 0; }
                    iVal += 2;
                }
                else {
                    if (val.substring(iVal, iVal + token.length) != token) { return 0; }
                    else { iVal += token.length; }
                }
            }
            // If there are any trailing characters left in the value, it doesn't match
            if (iVal != val.length) { return 0; }
            // Is date valid for month?
            if (month == 2) {
                // Check for leap year
                if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) { // leap year
                    if (date > 29) { return 0; }
                }
                else { if (date > 28) { return 0; } }
            }
            if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {
                if (date > 30) { return 0; }
            }
            // Correct hours value
            if (hh < 12 && ampm == "PM") { hh = hh - 0 + 12; }
            else if (hh > 11 && ampm == "AM") { hh -= 12; }
            var newdate = new Date(year, month - 1, date, hh, mm, ss);
            return newdate;
        }

        var closest  = function (num, arr) {
            var curr = arr[0];
            var diff = Math.abs(num - curr);
            for (var val = 0; val < arr.length; val++) {
                var newdiff = Math.abs(num - arr[val]);
                if (newdiff < diff) {
                    diff = newdiff;
                    curr = arr[val];
                }
            }
            return curr;
        }

        var tools = {
            Base64: base64,
            WaitForFinalEvent: waitForFinalEvent,
            GetAgeString: getAgeString,
            GetAge: getAge,
            GetDateFromFormat: getDateFromFormat,
            log: function(msg) {
                if (settings.isDebug) {
                    console.log(msg);
                }
            },
            emptyPromise: function(data) {
                var d = $q.defer();
                d.resolve(data);
                return d.promise;
            },
            closest: closest
    }

        return tools;
    }
]);