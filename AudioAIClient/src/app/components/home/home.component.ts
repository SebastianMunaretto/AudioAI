import { DatabaseConnectionService } from './../../services/database-connection.service';
import { UserManagementService } from './../../services/user-management.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AudioRecorderPopupComponent } from '../audio-recorder-popup/audio-recorder-popup.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loading: boolean = false;

  constructor(public dialog: MatDialog, private userManagement: UserManagementService, private databaseConnection: DatabaseConnectionService, private _snackBar: MatSnackBar) {
    // Redirects to login if not logged in
    userManagement.blockComponentIfNotLoggedIn();
  }

  documents: { id: string, title: string, transcription: string, audio: string }[] = [];

  ngOnInit(): void {
    this.fetchItems();
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
      panelClass: 'popup-dialog'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchItems();
    });

  }

  deleteItem(id: string) {
    this.databaseConnection.deleteItemFromDB(id).then(data => {
      this.fetchItems();
      this.openSnackBar("Item deleted successfully!")
    });

  }


  fetchItems() {
    this.loading = true;
    this.databaseConnection.fetchDocuments().then(documents => {
      this.documents = documents;
      this.loading = false;
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "", {
      duration: 2000
    });
  }

}
