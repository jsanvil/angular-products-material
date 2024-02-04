import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  @ViewChild('userNameInput') userNameInput!: ElementRef;
  @Output() logged = new EventEmitter<string>();

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngAfterViewInit() {
    // FIX: Evita el error "ExpressionChangedAfterItHasBeenCheckedError"
    //      https://github.com/angular/angular/issues/13158#issuecomment-515311708
    setTimeout(() => {
      // Establece el foco en el campo de usuario
      this.userNameInput.nativeElement.focus();
    }, 0);
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get userPassword() {
    return this.loginForm.get('userPassword');
  }

  onSubmit() {
    this.loginService.login(this.userName?.value!, this.userPassword?.value!).subscribe({
      next: logged => {
        if (logged) {
          this.router.navigate(['/user/profile']);
        }
        else {
          this.userName?.setErrors({ invalid: true });
          this.userPassword?.setErrors({ invalid: true });
        }
      },
      error: err => console.error(err),
      complete: () => console.log('Login completed')
    });
  }

}
