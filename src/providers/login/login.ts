import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoginProvider {

  public currentUser = new EventEmitter();

  constructor() {
  }

}
