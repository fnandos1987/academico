import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ProfesorsqlService } from '../../database/profesorsql.service';
import { environment } from '../../../environments/environment';
import { ProfessorService } from '../../services/professor.service';

const SERVER_URL = environment.serverUrl;

@Component({
  selector: 'app-professor-detail',
  templateUrl: './professor-detail.page.html',
  styleUrls: ['./professor-detail.page.scss'],
})
export class ProfessorDetailPage implements OnInit {

  professor: any = {};

  constructor(private profDb: ProfesorsqlService,
              private professorServ: ProfessorService,
              private router: Router,
              private alertController: AlertController,
              private actionSheetController: ActionSheetController,
              private camera: Camera) { }

  ngOnInit() {
    this.carrega(this.profDb.id);
  }

  async carrega(id) {
    await this.profDb.getById(id).then(data => {
      this.professor = data;
    });
  }

  editaprofessor() {
    this.profDb.id = this.professor.id;
    this.router.navigate(['protected', 'professor-edit']);
  }

  excluirprofessor() {
    this.profDb.remove(this.professor.id);
    this.professorServ.delete(this.professor.id);
    this.router.navigate(['protected', 'professor']);
  }

  tirarFoto(pictureSource) {    
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: pictureSource
  }
  this
      .camera
      .getPicture(options)
      .then((imageData) => {
          let base64Image = 'data:image/jpeg;base64,' + imageData;          
          this.professor.foto = base64Image;
          this.profDb.updateFoto(this.professor.id, base64Image);
      }, (err) => {
          console.log(err);
      });
  }

  chumbaAvatar() {
    this.professor.foto = SERVER_URL + '/imgs/ghost_person.png';
    this.profDb.updateFoto(this.professor.id, null);
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
          this.tirarFoto(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      }, {
        text: 'Tirar foto usando a câmera',
        handler: () => {
          this.tirarFoto(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: 'Colocar avatar padrão',
        handler: () => {
          this.chumbaAvatar();
        }
      }, {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => { }
      }]
    });
    await actionSheet.present();
  }

}
