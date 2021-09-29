import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';
import { message } from '../models/message';

export interface chat {
  descripcion: string;
  name: string;
  id: string;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private db: AngularFirestore) { }

  getChatRooms(){
    // snapshotChanges() este metodo me permite estar observando los
    // cambios en tiempo real. returna Observables
    return this.db.collection('chatRooms').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        // La funcion data() me devuelve los datos que hay dentro de
        // el objeto. De esta forma podemos extraer los datos que llegan
        // de firebase
        const data = a.payload.doc.data() as chat;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }


  getChatRoom(chat_id: string){
    // doc() hacemos referencia a un documento de la colección
    // valueChanges() para returnar un solo observable
    return this.db.collection('chatRooms').doc(chat_id).valueChanges();
  }


  sendMsgToFirebase(message: message, chat_id: string){

    this.db.collection('chatRooms').doc(chat_id).update({
      // firestore.FieldValue.arrayUnion(message) esto hace como un push()
      // al arreglo que ya existe y con eso no me borra lo que ya existe en firebase
      messages: firestore.FieldValue.arrayUnion(message)
    });
  }


}
