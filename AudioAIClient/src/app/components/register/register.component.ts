import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Auth, sendPasswordResetEmail, signOut, createUserWithEmailAndPassword} from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private auth: Auth, private router: Router) { }

  async registerWithEmail() {
    const { email, password } = this.registerForm.value;
    try {
      const credential = await createUserWithEmailAndPassword(this.auth , email!, password!);
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }

}
