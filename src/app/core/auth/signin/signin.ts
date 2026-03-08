import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth/auth-service';
import { initFlowbite } from 'flowbite';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)

  userName: string = "";
  userEmail: string = "";
  userPhoto: string = "";
  errorMsg: string = "";
  isLoading: boolean = false;


  ngOnInit(): void {
    initFlowbite();
  }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,
    Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
  });
  
  

  signIn(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // console.log(this.loginForm);  
      this.authService.signIn(this.loginForm.value).subscribe({
        next:(res)=> {
          this.isLoading = false;
          this.authService.setUserData(res.data.user);
          this.router.navigate(["/timeline"])
          localStorage.setItem("token", res.data.token)
        },
        error: (err) => {
          this.errorMsg = err.error.message;
          this.isLoading = false;
        }
      })
    }
  }
}
