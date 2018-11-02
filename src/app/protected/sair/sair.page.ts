import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-sair',
  templateUrl: './sair.page.html',
  styleUrls: ['./sair.page.scss'],
})
export class SairPage implements OnInit {

  constructor(private authService: AuthenticationService, private sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.finishSession()
    this.authService.logout();
  }

}
