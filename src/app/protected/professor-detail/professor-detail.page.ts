import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../services/professor.service';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Professor } from '../../model/professor';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-professor-detail',
  templateUrl: './professor-detail.page.html',
  styleUrls: ['./professor-detail.page.scss'],
})
export class ProfessorDetailPage implements OnInit {

  professor;
  constructor(private professorService: ProfessorService,
              private router: Router,
              private alertController: AlertController,
              private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.carrega(this.professorService.id);
  }

  carrega(id) {
    this.professorService.getProfessor(id).subscribe(obj => {
      this.professor = obj;
      this.professor.foto = environment.serverUrl + this.professor.foto;
    })
  }

  editaprofessor() {
    this.professorService.id = this.professor.id;
    this.router.navigate(['protected', 'professor-edit']);
  }

  excluirprofessor() {
    console.log(this.professor.id);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza que deseja excluir esse professor?',
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
            this.excluirprofessor();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Escolha sua Ação',
      buttons: [{
        text: 'Carregar foto da galeria',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Tirar foto usando a câmera',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Colocar avatar padrão',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
