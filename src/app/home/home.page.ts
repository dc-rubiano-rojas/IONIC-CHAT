import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { ChatsService, chat } from '../servicios/chats.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ChatComponent } from '../componentes/chat/chat.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  chatRooms: any = [];

  constructor(private authService: AuthService,
              private chatService: ChatsService,
              private modalCtrl: ModalController,
              private actionSheetController: ActionSheetController) {}

  ngOnInit(){
    this.chatService.getChatRooms().subscribe( chats => {

      this.chatRooms = chats;
      });

  }


  Onlogout(){
    this.authService.logout();
  }

  openChat(chat){
    this.modalCtrl.create({
      component: ChatComponent,
      componentProps: {
        chat
      }
    }).then( (modal) => modal.present());
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Logout',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.Onlogout();
        }
      }]
    });
    await actionSheet.present();
  }



}
