import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SqliteService } from '../../database/sqlite.service';

const SERVER_URL = environment.serverUrl;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private form: FormGroup;
  alertPrompt;

  constructor(private authService: AuthenticationService,
              private http: HttpClient,
              private formBuilder: FormBuilder,
              private sqlite: SqliteService,
              public alertController: AlertController) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      pass: ['', Validators.required]
    });
    
    this.sqlite.createTables();
  }

  login() {
    this.http.post(`${SERVER_URL}/usuario/logar`, this.form.value)
      .toPromise()
      .then(response => {
        if (response) {
          this.authService.login(response);
        } else {
          this.presentAlert('Login não realizado', 'Não foi possível realizar a autenticação. Digite novamente seu usuário e senha.');
        }
      })
      .catch(err => {
        this.presentAlert('Ops!', 'Aparentemente estamos com probemas na conexão com o servidor. Tente novamente mais tarde');
      });
  }

  verificarEmail(email) {
    this.http.post(`${SERVER_URL}/usuario/novasenha`, { email: email })
      .toPromise()
      .then(response => {
        if (response) {
          this.alertPrompt.dismiss();
          this.presentAlert('Nova senha enviada', 'Sua nova senha foi enviada para seu email com sucesso.');
        } else {
          this.presentAlert('Usuário não encontrado', 'Esta email não foi encontrado na base de dados.');
        }
      })
      .catch(err => {
        this.alertPrompt.dismiss();
        this.presentAlert('Ops!', 'Aparentemente estamos com problemas na conexão com o servidor. Tente novamente mais tarde');
      });
  }

  async presentAlertPrompt() {
    this.alertPrompt = await this.alertController.create({
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
            this.verificarEmail(data.email);
            return false;
          }
        }
      ]
    });

    await this.alertPrompt.present();
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
