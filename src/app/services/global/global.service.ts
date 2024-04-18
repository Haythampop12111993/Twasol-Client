import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}
  islogin: boolean = false;
  userName = '';
  postData: any = {};
  addNewPost: any = {};
  allPosts: any = [];
  isUserHaveProfile = false;
  userImage = 'assets/default.png';
  key = 'echo123Crypto';
  LikeColor = 'black';
  unLikeColor = 'black';
  public encrypt(text: string): string {
    return crypto.AES.encrypt(text, this.key).toString();
  }
  public decrypt(text: string): string {
    return crypto.AES.decrypt(text, this.key).toString(crypto.enc.Utf8);
  }
}
