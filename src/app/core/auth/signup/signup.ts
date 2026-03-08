import { Component, inject, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink } from "@angular/router";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth-service';


@Component({
  selector: 'app-signup',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, RouterLink,ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)

  successMsg: string = "";
  errorMsg: string = "";
  isLoading: boolean = false;

  ngOnInit(): void {
    initFlowbite();
  }
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    username: new FormControl(null, [Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    dateOfBirth: new FormControl(null, [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    password: new FormControl(null, [Validators.required,
    Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
  }, { validators: [this.confirmPassword] });
  
  confirmPassword(group:AbstractControl) {
    
    const password = group.get("password")?.value;
    const rePassword = group.get("rePassword")?.value;

    if (rePassword !== password && rePassword !== "") {
      group.get("rePassword")?.setErrors({ mismatch: true })
      return {mismatch: true}
    }
    return null

  }

  signUp(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          this.errorMsg = "";
          this.successMsg = res.message;
          this.isLoading = false;
          this.router.navigate(["/signin"])
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
