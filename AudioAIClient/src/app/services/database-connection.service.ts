import { FirebaseApp } from '@angular/fire/app';
import { Injectable } from '@angular/core';
import { getApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { doc, setDoc, collection, getFirestore, addDoc, getDocs, deleteDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class DatabaseConnectionService {

  constructor(private app: FirebaseApp) { }

  async fetchDocuments(collectionName: string | null) {
    const db = getFirestore(getApp());
    const userId = getAuth().currentUser?.uid;
    const documentsRef = collection(db, `users/${userId}/${collectionName}`);
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

  async saveAudioIntoDB(transcription: string, title: string, audio: Blob, collectionName: string | null) {
    const db = getFirestore(getApp());
    const userId = getAuth(this.app).currentUser?.uid;

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
      await addDoc(collection(db, `users/${userId}/${collectionName}`), audioData);
    };
  }

  async deleteItemFromDB(id: string, collectionName: string | null) {
    const db = getFirestore(getApp());
    const userId = getAuth(this.app).currentUser?.uid;
    const docRef = doc(db, `users/${userId}/${collectionName}/${id}`);

    try {
      await deleteDoc(docRef);
      console.log(`Document with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }

  // Fetches all the collections the user has so he can route to them
  async fetchUserCollectionNames(){

  }


}
