import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { UserService } from '../services/user.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  user = '';

  constructor(
    private title: Title,
    private loginService: UserService) { }
  
  ngOnInit() {
    this.title.setTitle('Inicio');
    this.user = this.loginService.getUserLogged();
  }
}
