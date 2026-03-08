import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroRegister } from "../hero-register/hero-register";


@Component({
  selector: 'app-authlayout',
  imports: [RouterOutlet, HeroRegister],
  templateUrl: './authlayout.html',
  styleUrl: './authlayout.css',
})
export class Authlayout {

}
