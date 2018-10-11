import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertController } from '@ionic/angular';

const SERVER_URL = environment.serverUrl;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  registerCredentials = { login: '', pass: '' };

  constructor(private authService: AuthenticationService, private http: HttpClient, public alertController: AlertController) { }

  ngOnInit() {
  }

  login() {
    this.authService.login('2');
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Esqueceu a senha?',
      message: 'Digite seu email abaixo',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'OK',
          handler: data => {
            if (data.email == 'fernando@unidavi.edu.br') {
              this.presentAlert('Nova senha enviada', 'Sua nova senha foi enviada para seu email com sucesso.');
              return true;
            } else {
              this.presentAlert('Usuário não encontrado', 'Esta email não foi encontrado na base de dados.');
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
