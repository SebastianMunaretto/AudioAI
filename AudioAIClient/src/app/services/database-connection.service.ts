import { Injectable } from '@angular/core';
import { getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { doc, setDoc, collection, getFirestore, addDoc, getDocs } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class DatabaseConnectionService {

  constructor() { }

  async fetchDocuments() {
    const db = getFirestore(getApp());
    const userId = getAuth().currentUser?.uid;

    const documentsRef = collection(db, `users/${userId}/documents`);
    const documentsSnapshot = await getDocs(documentsRef);

    const documents: any = [];
    documentsSnapshot.forEach((doc) => {
      documents.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    console.log(documents);
    return documents;
  }

  async saveAudioIntoDB(transcription: string, title: string, audio: Blob) {
    const db = getFirestore(getApp());

    // Assuming you have a Firebase user object
    const userId = getAuth().currentUser?.uid;

    // Convert the audio blob to a base64 string
    const reader = new FileReader();
    reader.readAsDataURL(audio);
    reader.onload = async () => {
      const audioData = {
        title: title,
        transcription: transcription,
        audio: reader.result as string // This will be the base64 string
      };

      // Save the audio data to Firestore
      await addDoc(collection(db, `users/${userId}/documents`), audioData);
    };
  }


}
