import { MiscService } from './../../services/misc.service';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { DatabaseConnectionService } from './../../services/database-connection.service';
import { UserManagementService } from './../../services/user-management.service';
import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AudioRecorderPopupComponent } from '../audio-recorder-popup/audio-recorder-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loading: boolean = false;
  collectionName!: string | null;
  theme: string | null;

  constructor(public dialog: MatDialog, private miscService: MiscService, private actRoute: ActivatedRoute, private userManagement: UserManagementService, private databaseConnection: DatabaseConnectionService, private _snackBar: MatSnackBar) {
    this.theme = miscService.getThemeColor();
  }

  documents: { id: string, title: string, transcription: string, audio: string }[] = [];

  ngOnInit() {
    this.userManagement.blockComponentIfNotLoggedIn();
    // By subscribing the value gets updated not only once but also when the component is not reloaded and the url is changed
    this.actRoute.params.subscribe(params => {
      this.collectionName = params['collectionName'];
      this.fetchItems(this.collectionName);
    });
  }

  /* Turns base64 into binary by removing headers, than converts it into blob and finally into Audio playing it */
  playAudio(base64Audio: any) {

    let BASE64_MARKER = ';base64,';
    let base64Index = base64Audio.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    let base64 = base64Audio.substring(base64Index);
    let raw = window.atob(base64);
    let rawLength = raw.length;
    let arr = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      arr[i] = raw.charCodeAt(i);
    }

    let binary = arr;
    let blob = new Blob([binary], {
      type: 'audio/ogg'
    });
    const url = window.URL.createObjectURL(blob);
    let audio = new Audio(url);
    audio.play();
  }

  openDialog() {

    const dialogRef = this.dialog.open(AudioRecorderPopupComponent, {
      maxWidth: '90vw',
      maxHeight: '90vh',
      width: '600px',
      height: '500px',
      panelClass: 'popup-dialog',
      data: {collectionName: this.collectionName}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchItems(this.collectionName);
    });

  }

  deleteItem(id: string) {
    this.databaseConnection.deleteItemFromDB(id,this.collectionName).then(data => {
      this.fetchItems(this.collectionName);
      this.openSnackBar("Item deleted successfully!")
    });

  }


  fetchItems(collectionName: string | null) {
    // needed else user gets not loaded fast enough
    onAuthStateChanged(getAuth(), (user) => {
      this.loading = true;
      this.databaseConnection.fetchDocuments(this.collectionName).then(documents => {
        this.documents = documents;
        this.loading = false;
      });
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 2000
    });
  }

}
