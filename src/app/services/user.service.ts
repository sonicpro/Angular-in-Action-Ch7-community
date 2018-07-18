import { Injectable } from '@angular/core';
import { Router } from "@angular/router"

let username = localStorage.getItem('username') || '';
let guest = (username) ? false : true;

// Also this service closes "chat" secondary routes on logout.
@Injectable()
export class UserService {

  constructor(private router: Router) {}

  isGuest() {
    return guest;
  }

  getUser() {
    return username;
  }

  login(newUsername) {
    username = newUsername;
    guest = false;
    localStorage.setItem('username', username);
  }

  logout() {
    username = '';
    guest = true;
    localStorage.setItem('username', '');
    // The same trick as in the chat / chat-list.component.ts close() methods.
    this.router.navigate([{ outlets: { chat: null }}]);
  }
}
