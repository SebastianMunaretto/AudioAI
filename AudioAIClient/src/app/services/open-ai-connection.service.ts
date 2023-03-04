import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenAiConnectionService {


  private apiUrl = 'https://api.openai.com/v1/audio/transcriptions';

  constructor(private http: HttpClient) { }

  transcribeAudio(audioBlob: Blob) {


    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.mp3');
    formData.append('model', 'whisper-1');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${environment.openAiApiKey}`);

    return this.http.post(this.apiUrl, formData, { headers });
  }
}
