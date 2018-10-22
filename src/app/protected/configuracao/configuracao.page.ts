import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const SERVER_URL = environment.serverUrl;
const TOKEN_KEY = 'auth-token';

@Component({
    selector: 'app-configuracao',
    templateUrl: './configuracao.page.html',
    styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage implements OnInit {

    private form: FormGroup;

    constructor(private http: HttpClient,
                private formBuilder: FormBuilder,
                private toastCtrl: ToastController,
                private storage: Storage) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            nome: ['', Validators.required],
            idioma: ['', Validators.required]
          }); 
    }

    alterarUsuario() {
        this.storage.get(TOKEN_KEY).then((val) => {
            let user = this.form.value;
            user.id = val;
            this.http.put(`${SERVER_URL}/usuario/alterar`, user)
                .toPromise()
                .then(response => {
                    if (response) {
                        this.presentToast('Configurações atualizadas com sucesso!');
                    } else {
                        this.presentToast('Desculpe! Não foi possível atualizar suas configurações');
                    }
                })
                .catch(err => {
                    this.presentToast('Ops! Aparentemente estamos com probemas na conexão com o servidor. Tente novamente mais tarde');
                });
        });
    }

    async presentToast(message) {
        const toast = await this.toastCtrl.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }

}
