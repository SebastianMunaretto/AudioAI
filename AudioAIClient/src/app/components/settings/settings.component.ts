import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private router: Router, private auth: Auth) {
    const userState = getAuth();
    onAuthStateChanged(userState, (user) => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  async logOut() {
    try {
      this.auth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }

}
