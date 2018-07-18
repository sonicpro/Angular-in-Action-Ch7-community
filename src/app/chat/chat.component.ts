import { Component, ElementRef, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChatBotService } from '../services/chat-bot.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  user: string;
  callee: string;
  messages: any[];
  message: string = '';
  @ViewChild('scrollBox') private scrollBox: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // used to close the chat and navigate to the parent route by nullifying the secondary route.
    private chatBotService: ChatBotService,
    private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>
    {
      this.messages = [];
      this.user = this.userService.getUser(); // Logged in / guest user.
      this.callee = params["username"] // user to talk with. Set to routerLink in chat-list.component.html.
    })
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  close() {
    this.router.navigate([{ outlets: { chat: null }}]); // We could use the router link in the template as well.
  }

  onKeyUp(event) {
    if (event.keyCode == 13) {
      this.send();
    }
  }

  send() {
    this.addMessage(this.user, this.message, 'left');
    this.reply();
    this.message = '';
  }

  private addMessage(author, message, type) {
    this.messages.push({
      author: author,
      message: message,
      type: type
    });
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollBox.nativeElement.scrollTop = this.scrollBox.nativeElement.scrollHeight;
    } catch(err) {
      console.log(err);
    }
  }

  private reply() {
    setTimeout(() => {
      this.addMessage(this.callee, this.chatBotService.respond(), 'right');
    }, 2500);
  }

}
