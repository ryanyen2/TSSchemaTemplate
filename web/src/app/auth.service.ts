import { User } from './../../../schema/user/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  constructor() { }

  async checkLogin(): Promise<User>
  {
    return undefined;
    // return {
    //   name: 'test',
    //   age: 'wtf',
      
    // }
  }

  async login(): Promise<boolean>
  {
    return false;
  }
}
