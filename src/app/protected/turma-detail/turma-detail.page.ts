import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../../services/turma.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-turma-detail',
  templateUrl: './turma-detail.page.html',
  styleUrls: ['./turma-detail.page.scss'],
})
export class TurmaDetailPage implements OnInit {

  turma;
  constructor(private turmaService: TurmaService, 
              private router: Router, 
              private alertController: AlertController) { }

  ngOnInit() {
    this.carrega(this.turmaService.id);
  }

  carrega(id) {
    this.turmaService.getTurma(id).subscribe(obj => {
      this.turma = obj;
    })
  }

  editaTurma() {
    this.turmaService.id = this.turma.id;
    this.router.navigate(['/turma-edit']);
  }

  excluirTurma() {
    console.log(this.turma.id);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza que deseja excluir essa turma?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {            
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.excluirTurma();
          }
        }
      ]
    });

    await alert.present();
  }

}
