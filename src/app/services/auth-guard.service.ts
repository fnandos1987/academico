import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public authService: AuthenticationService, private sessionService: SessionService) { }

  canActivate(): boolean {
    if (!this.sessionService.isSessionValid()) {
      this.sessionService.finishSession();
      this.authService.logout();
    }
    return this.authService.isAuthenticated();
  }

}
