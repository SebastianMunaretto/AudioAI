import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AudioRecorderPopupComponent } from '../audio-recorder-popup/audio-recorder-popup.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(AudioRecorderPopupComponent, {
      maxWidth: '90vw',
      maxHeight: '90vh',
      width: '600px',
      height: '500px',
      panelClass: 'popup-dialog'
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog closed');
    });
  }

}
