import { DatabaseConnectionService } from './../../services/database-connection.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { OpenAiConnectionService } from 'src/app/services/open-ai-connection.service';


@Component({
  selector: 'app-audio-recorder-popup',
  templateUrl: './audio-recorder-popup.component.html',
  styleUrls: ['./audio-recorder-popup.component.scss']
})
export class AudioRecorderPopupComponent {

  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];

  constructor(private openaiService: OpenAiConnectionService, private databaseService: DatabaseConnectionService) { }

  /*
    saves audio into media recorder
  */
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
    const audio = this.createAudioOutOfChunks();
    audio.play();
  }

  playRecording() {
    const audio = this.createAudioOutOfChunks();
    audio.play();
  }

  private onDataAvailable(event: BlobEvent) {
    this.recordedChunks.push(event.data);
  }

  private createAudioOutOfChunks() {
    const blob = new Blob(this.recordedChunks, { type: 'audio/webm' });
    const url = window.URL.createObjectURL(blob);
    return new Audio(url);
  }

  /*
   After audio was recorded services are called and data gets saved into database
  */
  async transcribeAudio() {
    try {
      // Service call that work with openai api
      const transcription: any = await this.openaiService.transcribeAudio(new Blob(this.recordedChunks, { type: 'audio/webm' })).toPromise();
      const title: any = await this.openaiService.generateTranscriptionTitle(transcription).toPromise();
      await this.databaseService.saveAudioIntoDB(transcription!.text,title!.choices[0].message.content, new Blob(this.recordedChunks, { type: 'audio/webm' }));
      console.log(transcription,title);
    } catch (error) {
      console.log(error);
    }
  }

}
