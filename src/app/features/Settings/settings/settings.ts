import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/services/auth/auth-service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-settings',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,ReactiveFormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  private readonly authService = inject(AuthService);
    private readonly toastr = inject(ToastrService);

  successMsg: string = "";
  errorMsg: string = "";
  isLoading: boolean = false;

  changePassForm: FormGroup = new FormGroup({

    password: new FormControl(null, [Validators.required,]),

    newPassword: new FormControl(null, [Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    
    rePassword: new FormControl(null, [Validators.required]),
  }, { validators: [this.confirmPassword] });
  
  confirmPassword(group:AbstractControl) {
    
    const newPassword = group.get("newPassword")?.value;
    const rePassword = group.get("rePassword")?.value;

    if (rePassword !== newPassword && rePassword !== "") {
      group.get("rePassword")?.setErrors({ mismatch: true })
      return {mismatch: true}
    }
    return null

  }

  changPass(): void {
    if (this.changePassForm.valid) {
      this.isLoading = true;
      const body = {
    password: this.changePassForm.value.password,
    newPassword: this.changePassForm.value.newPassword
  };

      this.authService.changePassword(body).subscribe({
        next: (res) => {
          this.errorMsg = "";
          this.successMsg = res.message;
          this.isLoading = false;
          this.toastr.success(res.message, "Post App");
          localStorage.setItem("token", res.data.token);
          this.changePassForm.reset();
        },
        error: (err) => {
          
          this.successMsg = "";
          this.errorMsg = err.error.message;
          this.isLoading = false;
        }
      })
    }
  }
}
