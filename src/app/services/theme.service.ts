import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = false;

  constructor() {
    this.setDarkMode(this.isDarkMode());
  }

  isDarkMode() {
    if (localStorage.getItem('darkMode')) {
      return localStorage.getItem('darkMode') === 'enabled' ? true : false;
    }
    return this.darkMode;
  }

  setDarkMode(isDarkMode: boolean) {
    this.darkMode = isDarkMode;
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
