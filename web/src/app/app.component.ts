import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'ui';
  chats = [
    { author: 'Person 1', text: 'test' },
    { author: 'Person 2', text: 'test2' },
  ]

  loggedIn: boolean = false;

  constructor(private auth: AuthService){}
 
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loggedIn = !!this.auth.checkLogin();
  }

  async addChat(chatInputEl: HTMLTextAreaElement): Promise<void>
  {
    console.log(chatInputEl.value)
    this.chats.push({ author: 'Person 3', text: chatInputEl.value });
    chatInputEl.value = '';
  }

  async login(): Promise<void>{
    this.auth.login();
  }
}
