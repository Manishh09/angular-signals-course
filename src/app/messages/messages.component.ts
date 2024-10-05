import {Component, Signal, inject} from "@angular/core";
import {MessagesService} from "./messages.service";
import {NgClass} from "@angular/common";
import { Message } from "../models/message.model";

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  imports: [
    NgClass
  ],
  standalone: true
})
export class MessagesComponent {
 
  messageService = inject(MessagesService)

  message: Signal<Message | null> = this.messageService.message;


  onClose() {
    this.messageService.clear()
  }

}
