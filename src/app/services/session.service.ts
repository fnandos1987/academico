import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'session-token';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessionState = new BehaviorSubject(false);

  constructor(private storage: Storage, private platform: Platform) {
    this.platform.ready().then(() => {
      this.checkSession();
    });
  }

  checkSession() {
    this.storage.get(TOKEN_KEY).then(result => {
      let d = new Date();
      if (d.getTime() < result) {
        this.sessionState.next(true);
      } else {
        this.sessionState.next(false);
      }
    });
  }

  initSession() {
    let atual = new Date();
    let final = new Date(atual.getTime() + 60 * 60000);
    return this.storage.set(TOKEN_KEY, final.getTime()).then(() => {
      this.sessionState.next(true);
    });
  }

  finishSession() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.sessionState.next(false);
    });
  }

  isSessionValid() {
    let status = this.sessionState.value
    if (status) {
      this.initSession();
    }
    return status;
  }

}
