import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  user = '';

  constructor(
    private title: Title,
    private loginService: LoginService) { }
  
  ngOnInit() {
    this.title.setTitle('Inicio');
    this.user = this.loginService.getUserLogged();
  }
}
