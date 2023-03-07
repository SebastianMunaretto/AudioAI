import { Injectable } from '@angular/core';
import { getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { doc, setDoc, collection, getFirestore, addDoc, getDocs, deleteDoc } from "firebase/firestore";


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

    return documents;
  }

  async saveAudioIntoDB(transcription: string, title: string, audio: Blob) {
    const db = getFirestore(getApp());
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

  async deleteItemFromDB(id: string) {
    const db = getFirestore(getApp());
    const userId = getAuth().currentUser?.uid;
    const docRef = doc(db, `users/${userId}/documents/${id}`);

    try {
      await deleteDoc(docRef);
      console.log(`Document with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }


}
