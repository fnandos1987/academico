import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const SERVER_URL = environment.serverUrl;
const TOKEN_KEY = 'auth-token';

@Component({
    selector: 'app-configuracao',
    templateUrl: './configuracao.page.html',
    styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage implements OnInit {

    user = { id: null, nome: null, idioma: null };

    constructor(private http: HttpClient,
                private toastCtrl: ToastController,
                private storage: Storage) { }

    ngOnInit() {
    }

    alterarUsuario() {
        this.storage.get(TOKEN_KEY).then((val) => {
            this.user.id = val;
            this.http.put(`${SERVER_URL}/usuario/alterar`, this.user)
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
