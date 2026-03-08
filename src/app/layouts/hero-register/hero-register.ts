import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-register',
  imports: [],
  templateUrl: './hero-register.html',
  styleUrl: './hero-register.css',
})
export class HeroRegister {
isLogin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkRoute();
    
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
  }

  checkRoute() {
    this.isLogin = this.router.url.includes('signin');
  }
}
