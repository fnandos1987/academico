import { Component, OnInit } from '@angular/core';
import { Professor } from '../../model/professor';
import { ProfessorService } from '../../services/professor.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.page.html',
  styleUrls: ['./professor.page.scss'],
})
export class ProfessorPage implements OnInit {

  professores;
  page;

  constructor(private profService: ProfessorService) { }

  ngOnInit() {
    this.page = 0;
    this.professores = [];
    this.getProfessores();
  }

  doInfinite(event) {
    setTimeout(() => {
      this.page += 1;
      this.getProfessores();
      event.target.complete();
    }, 500);
  }

  getProfessores() {
    this.profService.getProfessores(this.page)
      .subscribe(data => {
        for (let i in data) {
          let p = new Professor(
            data[i].id,
            data[i].nome,
            data[i].data_nascto,
            data[i].foto,
            data[i].curriculo,
            data[i].status
          );
          this.professores.push(p);
        }
      })
  }

}
