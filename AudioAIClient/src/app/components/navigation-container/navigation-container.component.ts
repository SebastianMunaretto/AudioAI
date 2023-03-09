import { MiscService } from './../../services/misc.service';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { Component, HostBinding, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DatabaseConnectionService } from 'src/app/services/database-connection.service';

@Component({
  selector: 'app-navigation-container',
  templateUrl: './navigation-container.component.html',
  styleUrls: ['./navigation-container.component.scss']
})
export class NavigationContainerComponent implements OnInit {

  theme!: string | null;
  // Code generated when material design schematic was generated
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private miscService: MiscService, private databaseConnection: DatabaseConnectionService, private overlay: OverlayContainer) {
    this.theme = miscService.getThemeColor();
  }


  ngOnInit(): void {
    // onAuthStateChanged(getAuth(), (user) => {
    //   this.databaseConnection.fetchUserCollectionNames().then(docs => {

    //   });
    // });
  }

  toggleTheme(){
    this.miscService.toggleThemeColor();
    this.theme = this.miscService.getThemeColor();
  }

}
