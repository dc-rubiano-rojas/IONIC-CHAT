import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { message } from '../../models/message';
import { ChatsService } from '../../servicios/chats.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  chat: any;
  // message: message;
  mensajes = [];
  room: any;
  msg: string;

  constructor(private navParams: NavParams,
              private modalCtrl: ModalController,
              private charService: ChatsService) { }

  ngOnInit() {

    this.charService.getChatRoom(this.chat.id).subscribe( room => {
      console.log(room);
      this.room = room;
    });

    this.chat = this.navParams.get('chat');
  }

  closeChat(){
    this.modalCtrl.dismiss();
  }

  sendMessage(){

    const mensaje: message = {
      content: this.msg,
      type: 'text',
      date: new Date()
    };

    this.charService.sendMsgToFirebase(mensaje, this.chat.id);
    this.msg = '';
  }

}
