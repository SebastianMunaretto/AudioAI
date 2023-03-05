import { UserManagementService } from './../../services/user-management.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(private router: Router, private userManagement: UserManagementService) {
    userManagement.blockComponentIfNotLoggedIn();
  }

  logOut(){
    this.userManagement.logOut();
  }
}
