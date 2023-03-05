import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private auth: Auth, private router: Router) { }

  async loginWithEmail() {
    const { email, password } = this.loginForm.value;
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email!, password!);
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(this.auth, provider);
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }


}
