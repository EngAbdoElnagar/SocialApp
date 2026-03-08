import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../core/services/auth/auth-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit{
  private readonly authService = inject(AuthService)

  userName: string = "";
  userEmail: string = "";
  userPhoto: string = "";

  ngOnInit(): void {
    initFlowbite();
    this.getUserData();
  }

  userData$ = this.authService.userData$;
  getUserData() {
    this.authService.userData$.subscribe(user => {
      if (user) {
        this.userName = user.name;
        this.userEmail = user.email;
        this.userPhoto = user.photo;
      }
    });
  }

  logout() {
    this.authService.logOut()
  }
}
