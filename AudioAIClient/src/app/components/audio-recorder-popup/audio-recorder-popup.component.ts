import { DatabaseConnectionService } from './../../services/database-connection.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { OpenAiConnectionService } from 'src/app/services/open-ai-connection.service';


@Component({
  selector: 'app-audio-recorder-popup',
  templateUrl: './audio-recorder-popup.component.html',
  styleUrls: ['./audio-recorder-popup.component.scss']
})
export class AudioRecorderPopupComponent {

  @Output() recordCompleted = new EventEmitter<Blob | null>();

  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];

  constructor(private openaiService: OpenAiConnectionService, private databaseService: DatabaseConnectionService) { }

  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.addEventListener('dataavailable', this.onDataAvailable.bind(this));
        this.mediaRecorder.start();
      });
  }

  stopRecording() {
    this.mediaRecorder!.stop();
    this.mediaRecorder!.removeEventListener('dataavailable', this.onDataAvailable.bind(this));
    const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
    const url = window.URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  }

  playRecording() {
    const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
    const url = window.URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  }

  private onDataAvailable(event: BlobEvent) {
    this.recordedChunks.push(event.data);
  }

  close() {
    this.recordCompleted.emit(null);
  }

  async transcribeAudio() {
    try {
      //const transcription = await this.openaiService.transcribeAudio(new Blob(this.recordedChunks, { type: 'audio/webm' })).toPromise();
      //const title: any = await this.openaiService.generateTranscriptionTitle(transcription).toPromise();
      // console.log();
      // console.log(title!.choices[0].message.content)
      const transcription = {text: "This is a dummysdasdasdas text to test the insertion of the text and audio into the firebase databse"};
      const title = "Dummy titleasdasdsd";
      await this.databaseService.saveAudioIntoDB(transcription.text,title,new Blob(this.recordedChunks, { type: 'audio/webm' }));
      await this.databaseService.fetchDocuments();

    } catch (error) {
      console.log(error);
    }
  }

}
