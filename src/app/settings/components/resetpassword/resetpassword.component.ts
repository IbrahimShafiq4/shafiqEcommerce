import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {

  isLoading: boolean = false;
  apiError: string = '';

  constructor(private _SettingsService: SettingsService, private _Router: Router, private toastr: ToastrService) { }

  resetForm: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
  });

  
  handleResetForm(resetForm: FormGroup) {
    this.isLoading = true;
    if (resetForm.valid) {
        this._SettingsService.resetPassword(this.resetForm.get('currentPassword')?.value, this.resetForm.get('password')?.value, this.resetForm.get('rePassword')?.value).subscribe({
            next: (response) => {
                if (response.message === 'success') {
                    this._Router.navigate(['/home']);
                    this.isLoading = false;
                    this.toastr.success(response.message);
                }
            },
            error: (err) => {
                this.isLoading = false;
                console.log(err)
                this.apiError = err.error.message;
                this.toastr.success(err.error.message.split(' ').slice(0, 7).join(' '));
            }
        })
    }
}
}
