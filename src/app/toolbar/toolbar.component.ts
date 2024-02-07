import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../services/user.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  @Input() isMobile: boolean = false;
  @Output() onSideNavToggle = new EventEmitter();
  title = 'Angular Products';
  user = '';
  isDarkMode: boolean;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }

  constructor(
    private loginService: UserService,
    private themeService: ThemeService
  ) {
    this.isDarkMode = this.themeService.isDarkMode();
  }

  toggleSideNav() {
    this.onSideNavToggle.emit();
  }

  ngDoCheck() {
    this.user = this.loginService.getUserLogged();
  }

  onUserLogin(user: string) {
    this.user = user;
  }
}
