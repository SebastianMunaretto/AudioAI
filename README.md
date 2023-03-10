# AudioAI
This is a web application built using Angular and Firebase that allows users to record audio, transcribe it using the OpenAI API, and automatically generate a title that matches the content of the audio.

## Features

Record audio: Users can easily record audio by pressing a button on the web interface.

Transcription: The app transcribes the audio using the OpenAI API, which provides accurate and reliable transcriptions.

Title generation: Based on the transcription, the app generates a title that summarizes the content of the audio. Users can edit the title if they want.

Save and retrieve recordings: Users can save their recordings on Firebase and retrieve them later, along with the transcription and generated title.

Secure authentication: Users must sign in using their Google account to use the app. Firebase provides secure authentication and user management.

## Technologies Used

Angular (Typescript): Angular is a popular web framework for building single-page applications. We used it to build the user interface and the logic for recording, transcribing, and generating titles.

Firebase: Firebase is a cloud platform that provides various services, such as authentication, database, and storage. We used Firebase to store user data and manage authentication.

OpenAI API: The OpenAI API is a powerful machine learning platform that can perform a wide range of natural language processing tasks, including transcription and text generation. We used it to transcribe the audio and generate titles.
