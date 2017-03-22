common.factory('userService', ["$cookies", "$rootScope", "$http", '$q', '$location', 'toolService', 'apiService', '$window', function ($cookies, $rootScope, $http, $q, $location, tools, api, $window) {
    this.notifications = null;

    var self = this;

    this.user = null;

    this.getUserPromise = null;

    var userObject = function (obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.email = obj.email;

        this.isAuthenticated = function () { return this.id !== null; };
    };

    

    function setUser(data) {
        self.user = new userObject(data);
        
    }

    function userAuthCheckPromise() {
        var d = $q.defer();

        var authPromise = api.getData("Authentication", "IsUserLoggedIn");
        tools.log("Checking authentication");
        // check if we're authorized
        authPromise.then(
            function (data) {

                if (data.Success) {
                    //This is to enable the user to go to Manage My account (/profile/) while blocks are turned on for that User's results.
                    //if the location URL contains '/profile/'it bypasses the check for blocks. 
                    //This is to enable the user to go to Manage My account (/profile/) while blocks are turned on for that User's results.
                    //if the location URL contains '/profile/'it bypasses the check for blocks. 



                    d.resolve(true);

                    

                } else {
                    userService.setUnauthenticated();
                    d.resolve(false);
                }
            },
            function (data) {
                userService.setUnauthenticated();
                d.resolve(false);
            }
        );

        return d.promise;
    }

    function getUserFromServer() {
        var d = $q.defer();

        var promise = api.getData("Authentication", "GetUser");
        tools.log("Getting user");

        promise.then(
            function (data) {
                if (data && data.success) {
                    setUser(data.user);
                    // resolve the deferred promise
                    d.resolve(self.user);
                } else {
                    // reject the promise
                    d.reject(null);
                }
            }
        );

        self.getUserPromise = d.promise;
    }

    function getUser(authorizeCheck) {

        if (authorizeCheck != undefined && !authorizeCheck) {
            // auth check failed prior to this
            return tools.emptyPromise(null);
        }

        if (self.user && self.user.userId) {
            return tools.emptyPromise(self.user);
        };

        if (!self.getUserPromise) {
            getUserFromServer();
        }

        return self.getUserPromise;

    };

    function performUserWorkFlowsPromise(user) {
        var d = $q.defer();

        if (user == null) {
            d.resolve(false);
            return d.promise;
        }

        if (user.passwordExpired) {
            d.resolve(false);
            //navigationService.goToPath('/profile/expiredpassword');
            // workflows have redirected
        } else if (user.termsOfUseAccepted != null && !user.termsOfUseAccepted) {
            d.resolve(false);
            //navigationService.goToPath('/profile/accepttermsofuse');
            // workflows have redirected
        } else {
            // workflows have completed
            d.resolve(true);
        }

        return d.promise;
    };

    var userService = {

        GetUser: getUser,

        user: function () {
            return self.user;
        },

        setSpecialAccessState: function (value) {
            if (self.user && self.user.preferences) {
                self.user.preferences.SpecialAccessState = value;
            }
        },

        getPreferencesMenu: function () {
            return api.getData("account", "GetPreferencesMenu");
        },

        getAssociations: function () {
            return api.getData("account", "GetAssociations");
        },


        getUserDetails: function () {
            return api.getData("account", "GetUserDetails");
        },

        submitAdditionalProviderNumber: function (data) {
            return api.postData("user", "SubmitNewAssociation", data);
        },

        logout: function() {
            api.getData("authentication", "logout").then(function (data) {
                $window.location.href = '/account/login';
            });
        },

        userAuthenticatedCheck: function () {
            return userAuthCheckPromise()
                .then(getUser)
                .then(performUserWorkFlowsPromise);
        },

        updateUserDetails: function (username, title, givenName, surname, position, contactPhoneNum, contactMobileNum, email, organisationName, addressLine1, addressLine2, suburb, state, postalCode) {
            var form = {
                Username: username,
                Title: title,
                GivenName: givenName,
                Surname: surname,
                Position: position,
                ContactPhoneNum: contactPhoneNum,
                ContactMobileNum: contactMobileNum,
                Email: email,
                OrganisationName: organisationName,
                AddressLine1: addressLine1,
                AddressLine2: addressLine2,
                Suburb: suburb,
                State: state,
                PostalCode: postalCode
            };

            return api.postData("account", "UpdateUserDetails", form);
        },

        changePassword: function (existingPassword, newPassword, confirmNewPassword) {
            var form = {
                CurrentUsername: self.user.username,
                CurrentPassword: existingPassword,
                NewPassword: newPassword,
                ConfirmNewPassword: confirmNewPassword
            };

            return api.postData("account", "changepassword", form);
        },

        forgotPassword: function (email) {
            var form = { email: email };
            return api.postData("account", "forgotpassword", form);
        },

        forgotPasswordTokenPost: function (token, securityCode, password, confirmPassword) {
            var form = {
                ResetToken: token,
                SecurityNumber: securityCode,
                NewPassword: password,
                ConfirmNewPassword: confirmPassword
            };
            return api.postData("account", "resetpassword", form);
        },

        validateResetPasswordToken: function (token) {
            var form = {
                ResetToken: token
            };

            return api.postData("account", "validateresetpasswordtoken", form);
        },

        setUnauthenticated: function () {
            if (!self.user) return;
            self.user.userId = null;
            self.user.termsOfUseAccepted = null;
            self.user.passwordExpired = null;
            self.user.username = '';
            self.user.categoryFilter = null;
            self.user.preferences = null;
        },

        getLatestTermsAndConditions: function () {
            return api.getData("account", "GetLatestTermsOfUse");
        },

        acceptTermsOfUse: function (termsAndConditionsId) {
            var form = {
                UserId: self.user.userId,
                TermsOfUseId: termsAndConditionsId
            }
            return api.postData("account", "accepttermsofuse", form);
        },


    };

    return userService;

}]);