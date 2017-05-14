import { Component, Directive, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'account',
    templateUrl: 'views/account.component.html',
    styleUrls: ['css/account.component.css'],
    moduleId: module.id
})
export class AccountComponent implements OnInit {

    user: User = null;

    isBusy: boolean = true;

    isMenuSelected: boolean = false;

    selectedForm: string = "";

    generalForm: FormGroup;

    advancedForm: FormGroup;

    privacyForm: FormGroup;

    passwordForm: FormGroup;

    constructor(private userService: UserService, private formBuilder: FormBuilder) {
        
    }

    goToForm(formName: string): void {
        this.isMenuSelected = true;
        this.selectedForm = formName;
    }

    initialUser(): void {

        this.generalForm = this.formBuilder.group({
            'email': [this.user.email, [
                Validators.required,
                Validators.maxLength(20),
            ]
            ],
        });

        this.advancedForm = this.formBuilder.group({
            'phone': [this.user.phone, [
                Validators.required,
                Validators.maxLength(20),
            ]
            ],
        });

        this.privacyForm = this.formBuilder.group({
            'phone': [this.user.phone, [
                Validators.required,
                Validators.maxLength(20),
            ]
            ],
        });

        this.passwordForm = this.formBuilder.group({
            'oldPassword': ["", [
                Validators.required,
            ]
            ],
            'password': ["", [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(20),
                this.complexity
            ]
            ],
            'confirmPassword': ["", [
                Validators.required,
                Validators.maxLength(20),
                this.equal
            ]
            ],
        });

        this.selectedForm = "general";

        this.isBusy = false;

    }

    equal(control: AbstractControl): ValidationErrors | null {

        if (control && control.parent) {
            if (control.value && control.parent.get("password").value) {
                

                if (control.value !== control.parent.get("password").value) {
                    return {
                        equal: true
                    }
                }

            }
        }


        return null;

    }

    complexity(control: AbstractControl): ValidationErrors | null {

        if (control && control.parent) {
            if (control.value) {

                if (control.value.match(new RegExp('[A-Z]')) && control.value.match(new RegExp('[a-z]')) && control.value.match(new RegExp('[0-9]'))) {
                    return null;
                }
            }
        }

        return {
            complexity: true
        }

    }


    ngOnInit(): void {
        this.userService.getUser().then(response => {
            this.user = response;

            this.initialUser();

        });


    }

}
