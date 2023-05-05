import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    constructor(private _AuthService: AuthService, private _Router: Router, private toastr: ToastrService) { }

    isLoading: boolean = false;
    apiError: string = '';

    registerForm: FormGroup = new FormGroup({
        name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
        rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
        phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    } , {validators: this.rePasswordMatch});

    rePasswordMatch(registerForm: any) {
        let passwordControl = registerForm.get('password')
        let rePasswordControl = registerForm.get('rePassword')
        if(passwordControl?.value == rePasswordControl?.value) {
            return null;
        } else {
            rePasswordControl?.setErrors({
                passwordMatch : 'Password and rePassword don\'t matched',
            })
            return {passwordMatch : 'Password and rePassword don\'t matched'}
        }
    }

    handleRegister(registerForm: FormGroup) {
        this.isLoading = true;
        if (registerForm.valid) {
            this._AuthService.register(registerForm.value).subscribe({
                next: (response) => {
                    if (response.message === 'success') {
                        this._Router.navigate(['/login']);
                        this.isLoading = false;
                        this.toastr.success(response.message);
                    }
                },
                error: (err) => {
                    this.isLoading = false;
                    console.log(err)
                    this.apiError = err.error.message;
                    this.toastr.success(err.message);
                }
            })
        }
    }
}
