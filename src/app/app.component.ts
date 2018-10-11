import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Novo Professor',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Nova Turma',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Lista de Turmas',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Lista de Professores',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Configurações',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Sair',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['protected', 'professor']);
        } else {
          this.router.navigate(['login']);
        }
      });

    });
  }
}
