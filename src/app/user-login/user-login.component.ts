import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class LoginErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  @ViewChild('userNameInput') userNameInput?: ElementRef;
  @Output() logged = new EventEmitter<string>();
  // userName = '';
  // userPassword = '';

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(4)])
  });
  matcher = new LoginErrorStateMatcher();

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    if (this.loginService.isLogged()) {
      this.router.navigate(['/user/profile']);
    }
  }

  ngAfterViewInit() {
    // focus on the first input
    this.userNameInput!.nativeElement.focus();
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get userPassword() {
    return this.loginForm.get('userPassword');
  }

  login() {
    console.log(this.loginForm.value);
    
    const logged = this.loginService.login(this.userName?.value!, this.userPassword?.value!);
    if (logged) {
      this.router.navigate(['/user/profile']);
    }
    else {
      this.userName?.setErrors({ invalid: true });
      this.userPassword?.setErrors({ invalid: true });
    }
  }

}
