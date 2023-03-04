# Audio Transcription and Title Generation Application

This is a simple application that allows users to record audio and then transcribe the audio using the OpenAI API. 
The application then generates a title for the transcription based on the content of the audio.

Getting Started
To get started with this application, you will need to have an OpenAI API key. You can sign up for an API key on the OpenAI website.

Once you have your API key, you create the environment.ts files in the src/environments directory of the application.

Recording Audio
To record audio, simply click on the "Record" button on the home page of the application. The application will then prompt you to allow microphone access in your browser.

Once you have allowed microphone access, you can begin recording audio by clicking on the "Start Recording" button. When you are finished recording, click on the "Stop Recording" button.

When saving the audio it gets transcribed and a title gets generated.

Technologies Used
This application was built using Angular and the OpenAI API. The application also uses the RecordRTC library for audio recording.

Limitations
The OpenAI API has limits on the number of requests that can be made in a given time period. If you exceed these limits, you will not be able to use the API until the limit resets.
The accuracy of the transcription and title generation is dependent on the quality of the audio recording and the content of the audio.
The application currently only supports the "whisper-1" model for audio transcription.